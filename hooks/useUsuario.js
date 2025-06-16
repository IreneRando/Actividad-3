import { useState, useEffect } from "react";
import { fetchReservationsByUser } from "../api/api";
import { fetchActivityById } from "../api/api";

const useUsuario = (user) => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (user) {
          const dataReservations = await fetchReservationsByUser(user.user_id);
          setReservas(dataReservations);

          const dataActivitiesRaw = await Promise.all(
            dataReservations.map((res) => fetchActivityById(res.activity_id))
          );
          const dataActivities = dataActivitiesRaw.map(
            (activityArray) => activityArray[0]
          );
          setActivities(dataActivities);
        }
      } catch (error) {
        console.error("Error al obtener reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return { reservas, setReservas, activities, loading };
};

export default useUsuario;

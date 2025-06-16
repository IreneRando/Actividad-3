import { useState, useEffect } from "react";
import { fetchActivityById } from "../api/api";

const useReservas = (id) => {
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async (id) => {
      setLoading(true);
      try {
        if (id) {
        const data = await fetchActivityById(id);
        setActivity(data);
        }
      } catch (error) {
        console.error("Error al preparar para reservar", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity(id);
  }, [id]);

  return {activity, loading};
};

export default useReservas;
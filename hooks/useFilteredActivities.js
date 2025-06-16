import { useState, useEffect } from "react";

export const useFilteredActivities = (searchTerm = "", selectedCategory = "", maxPrice = Infinity) => {
  const [activities, setActivities] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch(`https://mock.apidog.com/m1/873119-854329-default/activities`);
        const data = await res.json();
        setActivities(data);
        setFiltered(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    const results = activities.filter(activity =>{
      const name = activity.name.toLowerCase().includes(searchTerm.toLowerCase());
      const category = selectedCategory ? activity.category === selectedCategory: true;
      const price = activity.price <= maxPrice;

      return name && category && price;
  });
    setFiltered(results);
  }, [searchTerm, selectedCategory, maxPrice, activities]);

  return { activities: filtered, loading, error };
};
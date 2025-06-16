import { Link } from "expo-router";
import { View, Text, Image } from "react-native";
import React from "react";
import { router } from "expo-router";

const ActivityCard = ({ activity }) => {
  if (!activity || !activity.id || !activity.name) {
    return <View className="p-2 border text-red-500">Actividad invalida</View>;
  }

  return (
    <View className="activity-card">
      {/* <Image
        src={activity.images?.[0]}
        alt={activity.name}
        className="activity-card-image"
      /> */}
      <View className="activity-card-content">
      <Text className="activity-card-title">{activity.name}</Text>
      <Text className="activity-card-description">
        {activity.short_description
          ? activity.short_description.slice(0, 100)
          : "Sin descripcion."}
      </Text>
     <Link
  href={`/(drawer)/(taks)/(stack)/landing/${activity.categoryId}/activities/${activity.id}`}
>
  Ver más
</Link>
      </View>
    </View>
  );
};

export default ActivityCard;

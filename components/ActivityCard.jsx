import { Link } from "expo-router";
import { View, Text, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import BotonPrincipal from "./BotonPrincipal";
const ActivityCard = ({ activity }) => {
  if (!activity || !activity.activity_id || !activity.name) {
    return (
      <View className="p-2 border">
        <Text className="text-red-500">Actividad invalida</Text>
      </View>
    );
  }

  return (
    <View className="activity-card">
      <Image
        source={{ uri: activity.images?.[0] }}
        accessibilityLabel={activity.name}
        style={{ width: 120, height: 120, borderRadius: 8 }}
      />
      <View className="activity-card-content">
        <Text className="activity-card-title">{activity.name}</Text>
        <Text className="activity-card-description">
          {activity.short_description
            ? activity.short_description.slice(0, 100)
            : "Sin descripcion."}
        </Text>
        <BotonPrincipal onPress={() => router.push('/(stack)/Activity/[id]/ActivityDetail/[idActivity]', { id: activity.id })}>
          Ver más
        </BotonPrincipal>
      </View>
    </View>
  );
};

export default ActivityCard;

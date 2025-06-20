import { Link } from "expo-router";
import { View, Text, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import BotonSecundario from "./BotonSecundario";
const ActivityCard = ({ activity }) => {
    if (!activity || !activity.activity_id || !activity.name) {
        return (
            <View className="p-2 border">
                <Text className="text-red-500">Actividad invalida</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 flex-row gap-4 p-4 border rounded-lg bg-white">
            <Image
                source={{ uri: activity.images?.[0] }}
                accessibilityLabel={activity.name}
                style={{ width: 120, height: 120, borderRadius: 8 }}
            />
            <View className="flex-1 gap-4">
                <Text className="font-semibold text-[#2E8B57]">{activity.name}</Text>
                <Text>
                    {activity.short_description
                        ? activity.short_description.slice(0, 100)
                        : "Sin descripcion."}
                </Text>
                <BotonSecundario style={{width: 20, height: 32}} onPress={() => router.push(`tabs/(stack)/Activity/ActivityDetail/${activity.activity_id}`)}>
                    Ver más
                </BotonSecundario>
            </View>
        </View>
    );
};

export default ActivityCard;
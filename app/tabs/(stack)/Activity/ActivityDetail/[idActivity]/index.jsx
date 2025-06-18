import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import BotonPrincipal from "../../../../../../components/BotonPrincipal";

const ActivityDetail = () => {
  const { idActivity } = useLocalSearchParams();
  const router = useRouter();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await fetch(
          `https://mock.apidog.com/m1/873119-854329-default/activities/${idActivity}`
        );
        if (!res.ok) throw new Error("Error al obtener la actividad");
        const data = await res.json();
        setActivity(data[0] || data); // Ajusta según la estructura de tu API
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [idActivity]);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Cargando actividad...</Text>
      </View>
    );
  if (!activity)
    return (
      <View>
        <Text>No se encontró la actividad.</Text>
      </View>
    );

  return (
    <View className="flex-1 flex-column p-4 bg-white gap-4">
      <Text className="text-xl font-bold text-[#2E8B57] mb-4">
        {activity.name}
      </Text>
      <ScrollView>
        <View className="flex-1 flex-column bg-white gap-4">
          <ScrollView horizontal>
            {activity.images?.map((imgUrl, index) => (
              <Image
                key={index}
                source={{ uri: imgUrl }}
                style={{
                  width: 200,
                  height: 150,
                  borderRadius: 8,
                  marginRight: 8,
                  backgroundColor: "#eee",
                }}
                accessibilityLabel={`Actividad ${index}`}
              />
            ))}
          </ScrollView>
          <Text >{activity.long_description}</Text>
          <View className="flex flex-row gap-4 mb-4 justify-between border border-gray-300 rounded-xl p-4 ">
            <View className="flex flex-col">
              <Text>
                <Text className="font-bold text-[#87CEEB]">Instructor:</Text> {activity.instructor}
              </Text>
              <Text>
                <Text className="font-bold text-[#87CEEB]">Precio:</Text> {activity.price}€
              </Text>
              <Text>
                <Text className="font-bold text-acento">Duración:</Text> {activity.duration} minutos
              </Text>
              <Text>
                <Text className="font-bold text-acento">Idioma:</Text> {activity.language}
              </Text>
              <Text>
                <Text className="font-bold text-acento">Categoría:</Text> {activity.category}
              </Text>
              <Text>
                <Text className="font-bold text-acento">Tipo:</Text> {activity.type}
              </Text>
              <Text>
                <Text className="font-bold text-acento">Cupo máximo:</Text> {activity.limit} personas
              </Text>
              <Text>
                <Text className="font-bold text-acento">Material incluido:</Text>{" "}
                {activity.includes_material ? "Sí" : "No"}
              </Text>
            </View>
            <View className="">
              <Text className="font-bold text-[#2E8B57]">
                Fechas disponibles:
              </Text>
              <View>
                {activity.available_dates?.map((date, index) => (
                  <Text key={index}>
                    • {new Date(date).toLocaleDateString()}
                  </Text>
                ))}
              </View>
            </View>
          </View>
          <View className="justify-center items-center">
            <BotonPrincipal
              onPress={() =>
                router.push(`/tabs/(stack)/Activity/ActivityDetail/${activity.activity_id}/booking`)
              }
            >
              Reservar
            </BotonPrincipal>


          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ActivityDetail;
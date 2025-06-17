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
      <View style={{ padding: 16 }}>
        <Text>No se encontró la actividad.</Text>
      </View>
    );

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 12 }}>
        {activity.name}
      </Text>
      <ScrollView horizontal style={{ marginBottom: 16 }}>
        {activity.images?.map((imgUrl, index) => (
          <Image
            key={index}
            source={{ uri: activity.images?.[0] }}
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
      <Text style={{ marginBottom: 16 }}>{activity.long_description}</Text>
      <View style={{ marginBottom: 16 }}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Instructor:</Text> {activity.instructor}
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Precio:</Text> {activity.price}€
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Duración:</Text> {activity.duration} minutos
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Idioma:</Text> {activity.language}
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Categoría:</Text> {activity.category}
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Tipo:</Text> {activity.type}
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Cupo máximo:</Text> {activity.limit} personas
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Material incluido:</Text>{" "}
          {activity.includes_material ? "Sí" : "No"}
        </Text>
      </View>
      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
          Fechas disponibles:
        </Text>
        <View>
          {activity.available_dates?.map((date, index) => (
            <Text key={index} style={{ marginLeft: 16, marginBottom: 4 }}>
              • {new Date(date).toLocaleDateString()}
            </Text>
          ))}
        </View>
      </View>
      <BotonPrincipal
        onPress={() =>
          router.push(`/activities/${activity.activity_id}/reserve`)
        }
      >
        Reservar
      </BotonPrincipal>
    </ScrollView>
  );
};

export default ActivityDetail;
import {SafeAreaView, Text, View, StyleSheet, ActivityIndicator, ScrollView} from "react-native";
import React, {useEffect, useState} from "react";

const AboutUsTab = () => {
const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await fetch("https://mock.apidog.com/m1/873119-854329-default/store");
        if (!res.ok) throw new Error("Error al cargar la información de la tienda");
        const data = await res.json();
        setStore(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
  }, []);

  if (loading) {
    return (
        <SafeAreaView>
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#2E8B57" />
                <Text className="text-xl font-bold mt-20">Cargando...</Text>
            </View>
      </SafeAreaView>
    );
  }

  if (!store) return null;

  return (
    <SafeAreaView>
        <ScrollView className="p-4">
        <Text className="text-2xl font-bold text-primary mt-4">{store.name}</Text>
        <Text className="text-lg mt-4">{store?.additional_info?.description}</Text>

        <Text className="text-xl font-bold mt-4">Dirección:</Text>
        <Text className="text-lg mt-2">
            {store.address.street} {store.address.number}, {store.address.city}, {store.address.country}, {store.address.postal_code}
        </Text>

        <Text className="text-xl font-bold mt-4">Contacto:</Text>
        <Text className="text-lg mt-2">{store.contact.phone}</Text>
        <Text className="text-lg mt-2">{store.contact.email}</Text>
        <Text className="text-lg mt-2">{store.contact.website}</Text>

        <Text className="text-xl font-bold mt-4">Horario:</Text>
        <Text className="text-lg mt-2">Lunes-Viernes: {store.hours.monday}</Text>
        <Text className="text-lg mt-2">Sábado: {store.hours.saturday}</Text>
        <Text className="text-lg mt-2">Domingo: {store.hours.sunday}</Text>
        </ScrollView>
    </SafeAreaView>
  );
}
export default AboutUsTab;
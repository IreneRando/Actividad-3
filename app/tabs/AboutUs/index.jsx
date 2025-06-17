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
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2E8B57" />
                <Text style={styles.loadingText}>Cargando...</Text>
            </View>
      </SafeAreaView>
    );
  }

  if (!store) return null;

  return (
    <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{store.name}</Text>
        <Text style={styles.paragraph}>{store?.additional_info?.description}</Text>

        <Text style={styles.subtitle}>Dirección:</Text>
        <Text style={styles.paragraph}>
            {store.address.street} {store.address.number}, {store.address.city}, {store.address.country}, {store.address.postal_code}
        </Text>

        <Text style={styles.subtitle}>Contacto:</Text>
        <Text style={styles.paragraph}>{store.contact.phone}</Text>
        <Text style={styles.paragraph}>{store.contact.email}</Text>
        <Text style={styles.paragraph}>{store.contact.website}</Text>

        <Text style={styles.subtitle}>Horario:</Text>
        <Text style={styles.paragraph}>Lunes-Viernes: {store.hours.monday}</Text>
        <Text style={styles.paragraph}>Sábado: {store.hours.saturday}</Text>
        <Text style={styles.paragraph}>Domingo: {store.hours.sunday}</Text>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
  subtitle: {
    marginTop: 20,
    fontWeight: "600",
    fontSize: 16,
  },
  paragraph: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default AboutUsTab;
import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Button, SafeAreaView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import useUsuario from '../hooks/useUsuario';
import { deleteReservation } from '../api/api';
import { router } from 'expo-router';

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const { reservas, setReservas, activities, loading } = useUsuario(user);
  const [openIndex, setOpenIndex] = useState(null);

  if (!user) {
    return (
      <View className="p-6 items-center">
        <Text className="text-gray-600">No hay usuario autenticado.</Text>
      </View>
    );
  }

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  const confirmDelete = (id) => {
    Alert.alert(
      'Eliminar reserva',
      '¿Estás seguro de que deseas eliminar esta reserva?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteReservation(id);
              setReservas(prev => prev.filter(r => r.reservation_id !== id));
            } catch (error) {
              Alert.alert('Error', 'Hubo un error al eliminar la reserva.');
            }
          },
        },
      ]
    );
  };

  const renderReservas = () => {
    if (!reservas || reservas.length === 0) {
      return <Text className="text-gray-600 mt-3">No tienes ninguna reserva.</Text>;
    }

    return reservas.map((reserva, index) => (
      <View
        key={reserva.reservation_id}
        className="border border-gray-300 rounded mb-3 overflow-hidden"
      >
        <TouchableOpacity
          className="bg-gray-100 px-4 py-2"
          onPress={() => setOpenIndex(openIndex === index ? null : index)}
        >
          <Text className="font-semibold text-lg">
            {activities[index].name} - {new Date(reserva.selected_date).toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        {openIndex === index && (
          <View className="px-4 py-2 bg-white">
            <Text><Text className="font-bold">Descripción:</Text> {activities[index].short_description}</Text>
            <Text className="mt-2"><Text className="font-bold">Comentarios:</Text> {reserva.reservation_comments}</Text>
            <View className="flex-row justify-between mt-4">
              <TouchableOpacity onPress={() => router.push(`/activities/${activities[index].activity_id}`)}>
                <Text className="text-blue-600 underline">Ver detalle</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => confirmDelete(reserva.reservation_id)}>
                <Text className="text-red-500 underline">Eliminar reserva</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    ));
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-base">Cargando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
    <ScrollView contentContainerStyle={{ padding: 20 }} className="bg-gray-100">
      <Text className="text-2xl font-bold mb-4">Perfil del usuario</Text>
      <Text><Text className="font-bold">Nombre:</Text> {user.name}</Text>
      <Text><Text className="font-bold">Email:</Text> {user.email}</Text>
      <Text><Text className="font-bold">Teléfono:</Text> {user.phone}</Text>
      <Text><Text className="font-bold">Fecha de registro:</Text> {user.registration_date}</Text>

      <Text className="mt-6 text-lg font-semibold">Reservas:</Text>
      {renderReservas()}

      <View className="mt-8">
        <Button title="Cerrar sesión" onPress={handleLogout} color="#cc0000" />
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

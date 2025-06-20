import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';
import useUsuario from '../hooks/useUsuario';
import { deleteReservation } from '../api/api';
import BotonPrincipal from './BotonPrincipal';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const { reservas, setReservas, activities, loading } = useUsuario(user);
  const [openIndex, setOpenIndex] = useState(null);

  const handleLogout = () => {
    logout();
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
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
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
              className="bg-gray-100 px-4 py-2 flex-row justify-between"
              onPress={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <Text className="font-semibold text-lg">
              {activities[index].name} - {new Date(reserva.selected_date).toLocaleDateString()}
            </Text>
            <FontAwesome size={16} name="chevron-down" className="pl-1 pt-1" color="black" />
          </TouchableOpacity>

          {openIndex === index && (
              <View className="px-4 py-2 bg-white">
                <Text className="text-lg">
                  <Text className="font-bold">Descripción:</Text> {activities[index].short_description}
                </Text>
                <Text className="mt-2 text-lg">
                  <Text className="font-bold">Comentarios:</Text> {reserva.reservation_comments}
                </Text>
                <View className="flex-row justify-between mt-4">
                  <TouchableOpacity onPress={() =>
                      router.push(`/tabs/(stack)/Activity/ActivityDetail/${activities[index].activity_id}`)
                  }>
                    <Text className="text-primary underline">Ver detalle</Text>
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
        <ScrollView className="p-5 bg-white shadow-lg shadow-black rounded-xl mt-20">
          <Text className="text-2xl font-bold mb-6 text-center">Perfil de usuario</Text>
          <Text className="text-lg"><Text className="font-bold">Nombre:</Text> {user.name}</Text>
          <Text className="text-lg"><Text className="font-bold">Email:</Text> {user.email}</Text>
          <Text className="text-lg"><Text className="font-bold">Teléfono:</Text> {user.phone}</Text>
          <Text className="text-lg"><Text className="font-bold">Fecha de registro:</Text> {new Date(user.registration_date).toLocaleDateString()}</Text>

          <Text className="mt-6 mb-4 text-lg font-semibold">Reservas:</Text>
          {renderReservas()}

          <View className="mt-8 items-center">
            <BotonPrincipal onPress={handleLogout}>
              Cerrar sesión
            </BotonPrincipal>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
}

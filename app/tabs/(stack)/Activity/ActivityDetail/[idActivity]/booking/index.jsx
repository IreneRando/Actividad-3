import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    Alert,
    Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AuthContext } from 'context/AuthContext';
import BotonPrincipal from 'components/BotonPrincipal';
import * as Haptics from 'expo-haptics';

export default function Booking() {
    const { idActivity } = useLocalSearchParams();
    const router = useRouter();
    const { user } = useContext(AuthContext);

    const [activity, setActivity] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [people, setPeople] = useState('1');
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const res = await fetch(
                    `https://mock.apidog.com/m1/873119-854329-default/activities/${idActivity}`
                );
                const data = await res.json();
                const actividad = data[0] || data;
                setActivity(actividad);
                if (actividad.available_dates?.length > 0) {
                    setSelectedDate(actividad.available_dates[0]);
                }
            } catch (error) {
                console.error('Error al cargar actividad:', error);
            }
        };

        fetchActivity();
    }, [idActivity]);

    const handleBooking = () => {
        if (!selectedDate || !people) {
            Alert.alert('Por favor, completa todos los campos.');
            return;
        }

        Alert.alert(
            'Reserva confirmada',
            `Has reservado ${people} plaza(s) para "${activity.name}" el ${new Date(selectedDate).toLocaleDateString()}`,
            [{ text: 'OK', onPress: () => {router.replace('/tabs/Profile');
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            }}]
        );
    };

    if (!activity) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-lg text-gray-700">Cargando actividad...</Text>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-white px-6 pt-10">
            <Text className="text-3xl font-extrabold text-center mb-1 text-gray-900">
                Selecciona día
            </Text>
            <Text className="text-center text-green-700 text-lg mb-6 font-semibold italic">
                {activity.name}
            </Text>

            <Text className="text-base font-medium mb-1 text-gray-800">Fecha:</Text>
            <View className="border border-gray-300 rounded-xl bg-white mb-5 overflow-hidden">
                <Picker
                    selectedValue={selectedDate}
                    onValueChange={(value) => setSelectedDate(value)}
                    style={{
                        height: Platform.OS === 'android' ? 44 : undefined,
                        color: '#111827',
                    }}
                >
                    {activity.available_dates?.map((date, idx) => (
                        <Picker.Item
                            key={idx}
                            label={new Date(date).toLocaleDateString()}
                            value={date}
                        />
                    ))}
                </Picker>
            </View>

            <Text className="text-base font-medium mb-1 text-gray-800">Número de personas:</Text>
            <TextInput
                keyboardType="numeric"
                value={people}
                onChangeText={setPeople}
                className="border border-gray-300 rounded-xl bg-white px-4 py-3 mb-5 text-base text-gray-900"
            />

            <Text className="text-base font-medium mb-1 text-gray-800">Deja un comentario:</Text>
            <TextInput
                multiline
                numberOfLines={5}
                placeholder="Comentario"
                value={comment}
                onChangeText={setComment}
                className="border border-gray-300 rounded-xl bg-white px-4 py-3 mb-6 text-base text-gray-900"
                textAlignVertical="top"
            />

            <View className="items-center">
                <BotonPrincipal onPress={handleBooking}>
                    Reservar
                </BotonPrincipal>
            </View>
        </ScrollView>
    );
}

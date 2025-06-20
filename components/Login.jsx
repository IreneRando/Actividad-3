import React, { useState, useContext } from 'react';
import { View, TextInput, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { fetchUsers } from '../api/api';
import BotonPrincipal from './BotonPrincipal';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const users = await fetchUsers();
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        login(user);
      } else {
        setError('Credenciales incorrectas');
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    } catch (err) {
      setError('Error al obtener usuario');
    }
  };

  return (
      <SafeAreaView>
        <View className="p-6 items-center justify-center">
          <Text className="text-2xl font-semibold mb-4">Iniciar sesión</Text>
          <TextInput
              className="w-full border border-gray-300 rounded p-2 mb-3"
              placeholder="Correo electrónico"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
          />
          <TextInput
              className="w-full border border-gray-300 rounded p-2 mb-3"
              placeholder="Contraseña"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
          />
          <BotonPrincipal onPress={handleLogin}>
            Iniciar sesión
          </BotonPrincipal>
          {!!error && <Text className="text-red-500 mt-3">{error}</Text>}
        </View>
      </SafeAreaView>
  );
}

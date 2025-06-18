// components/ProtectedRoute.jsx
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { usuario } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!usuario) {
            router.replace('/'); // Redirige al login u home si no está logueado
        }
    }, [usuario]);

    if (!usuario) {
        return <Text>Redirigiendo...</Text>;
    }

    return children;
}

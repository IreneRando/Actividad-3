import React from 'react';
import {
    Text,
    View,
    ImageBackground,
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native';
import { router } from 'expo-router';
import BotonPrincipal from 'components/BotonPrincipal';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
    return (
        <ImageBackground
            source={require('../../../../assets/fondo-home.jpg')}
            resizeMode="cover"
            style={styles.background}
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>Outdoor Adventure</Text>
                <Text style={styles.subtitle}>
                    Descubre experiencias al aire libre y deportivas
                </Text>
                <View style={styles.buttonContainer}>
                    <BotonPrincipal onPress={() => router.push('tabs/(stack)/Activity')}>
                        Reservar Actividades
                    </BotonPrincipal>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        paddingHorizontal: 24,
        paddingVertical: 48,
        borderRadius: 24,
        alignItems: 'center',
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    title: {
        fontSize: Platform.OS === 'ios' ? 38 : 36,
        fontWeight: '800',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 16,
        textShadowColor: 'rgba(0,0,0,0.4)',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '400',
        color: '#f3f4f6',
        textAlign: 'center',
        marginBottom: 32,
        paddingHorizontal: 12,
    },
    buttonContainer: {
        marginTop: 8,
        width: '100%',
        alignItems: 'center',
    },
});

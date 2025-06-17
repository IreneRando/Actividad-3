import '../global.css';
import { Slot, SplashScreen } from 'expo-router';
import {useFonts} from "expo-font";
import React, {useEffect} from "react";
import { AuthProvider } from 'context/AuthContext';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {


    const [fontsLoaded, error] = useFonts({
        'Poppins': require('../assets/fonts/Poppins-Medium.ttf')
    });

    useEffect(() => {
        if (error) throw error;

        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error]);

    if (!fontsLoaded && !error) return null;

    return (
        <AuthProvider>
            <Slot/>
        </AuthProvider>
    );
};
export default RootLayout;
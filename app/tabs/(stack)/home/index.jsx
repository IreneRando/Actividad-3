import React from 'react';
import {Text, View, Image} from "react-native";
import {router} from 'expo-router';
import BotonPrincipal from 'components/BotonPrincipal';

const HomeScreen = () => {
    return (
        <View className="flex-1 mt-5">
            <View className="flex-1 px-10 mt-5 bg-white-500 text-white justify-center items-center">

                <Text className="text-center text-4xl mb-10">Outdoor Adventure</Text>
                <Text className="text-center text-2xl mb-10">Descubre experiencias al aire libre y deportivas</Text>

                <BotonPrincipal onPress={() => router.push('tabs/(stack)/Activity/[id]')}>
                    Reservar Actividades
                </BotonPrincipal>
            </View>
        </View>
    )
};

export default HomeScreen;
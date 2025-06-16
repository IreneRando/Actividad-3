import React from 'react';
import {Pressable, Text} from "react-native";

const BotonPrincipal = ({color="bg-primary", onPress, onLongPress, children}) => {

    return (
        <Pressable
            className={`w-64 p-3 rounded-full ${color} active:opacity-90`}
            onPress={onPress}
            onLongPress={onLongPress}
        >
            <Text className="text-white text-center font-rasa-light text-xl">
                {children}
            </Text>
        </Pressable>
    );
}

export default BotonPrincipal;
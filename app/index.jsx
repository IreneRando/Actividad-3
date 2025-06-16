import React from 'react';
import {Redirect} from "expo-router";
import {SafeAreaView} from "react-native";

const App = () => {
    return (
        <SafeAreaView className="flex-1">
            <Redirect href="/(stack)/home"/>
        </SafeAreaView>
    );
}

export default App;
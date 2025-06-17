import {SafeAreaView, Text, View} from "react-native";
import React, {useContext} from "react";
import { AuthContext } from "context/AuthContext";
import Login from "components/Login";
import Profile from "components/Profile";


const ProfileTab = () => {
    const {user}=useContext(AuthContext);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="p-4">
                {user ? <Profile /> : <Login />}
            </View>
        </SafeAreaView>
    )
}

export default ProfileTab;
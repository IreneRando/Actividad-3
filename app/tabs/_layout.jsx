import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const TabsLayout = (props) => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2E8B57",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
        },
      }}
    >
      <Tabs.Screen
        name="(stack)"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="AboutUs/index"
        options={{
          title: "Sobre Nosotros",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="image" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile/index"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
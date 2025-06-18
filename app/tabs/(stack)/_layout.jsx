import { Stack } from "expo-router";

export default function StackLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: "#2E8B57",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}
        >
            <Stack.Screen
                name="home/index"
                options={{
                    title: "Inicio",
                }}
            />
            <Stack.Screen
                name="Activity/index"
                options={{
                    title: "Listado de actividades",
                }}
            />
            <Stack.Screen
                name="Activity/ActivityDetail/[idActivity]/index"
                options={{
                    title: "Detalle de actividad",
                }}
            />
            <Stack.Screen
                name="Activity/ActivityDetail/[idActivity]/booking/index"
                options={{
                    title: "Reserva",
                }}
            />
        </Stack>
    );
}

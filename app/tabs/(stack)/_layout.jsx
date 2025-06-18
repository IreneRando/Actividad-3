import {Stack} from "expo-router";

const StackLayout = () => {
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
            <Stack.Screen name="home" options={{
                title: "Inicio"
            }}>
            </Stack.Screen>
            <Stack.Screen name="tabs/Activity" options={({ route }) => ({
                title: `Listado de actividades`,
            })}>
            </Stack.Screen>
            <Stack.Screen name="tabs/Activity/ActivityDetail/[idActivity]" options={({ route }) => ({
                title: `${route.params.title}`,
            })}>
            </Stack.Screen>
            <Stack.Screen name="tabs/Activity/ActivityDetail/[idActivity]/booking" options={({ route }) => ({
                title: `Selecciona tus dias`,
            })}>
            </Stack.Screen>
        </Stack>
    )
}

export default StackLayout;
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
            <Stack.Screen name="home/index" options={{
                title: "Inicio"
            }}>
            </Stack.Screen>
            <Stack.Screen name="Activity/[id]/index" options={({ route }) => ({
                title: `${route.params.id}`,
            })}>
            </Stack.Screen>
            <Stack.Screen name="Activity/[id]/ActivityDetail/[idActivity]/index" options={({ route }) => ({
                title: `${route.params.id}`,
            })}>
            </Stack.Screen>
            <Stack.Screen name="Activity/[id]/ActivityDetail/[idActivity]/booking/index" options={({ route }) => ({
                title: `Selecciona tus dias`,
            })}>
            </Stack.Screen>
        </Stack>
    )
}

export default StackLayout;
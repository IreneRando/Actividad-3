import { useState, useContext } from "react";
import ActivityCard from "../../../../components/ActivityCard";
import { View, Text, TextInput, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../../../../context/AuthContext";
import Login from "components/Login";
import { useFilteredActivities } from "../../../../hooks/useFilteredActivities";

const Activity = () => {
  const { user } = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const { activities, loading, error } = useFilteredActivities(
      search,
      category,
      maxPrice !== "" ? parseFloat(maxPrice) : Infinity
  );

  return (
      <View className="flex-1 p-4 gap-4 bg-white">
        {!user ? (
            <Login />
        ) : (
            <>
              <Text className="font-semibold text-xl">Actividades Disponibles</Text>
              <ScrollView>
                <View className="flex-1 gap-4">
                  <TextInput
                      value={search}
                      onChangeText={setSearch}
                      placeholder="Buscar actividad..."
                      className="border border-gray-300 rounded-lg bg-white"
                  />

                  <View className="border border-gray-300 rounded-lg bg-white">
                    <Picker
                        selectedValue={category}
                        onValueChange={(value) => setCategory(value)}
                    >
                      <Picker.Item label="Todas las categorías" value="" />
                      <Picker.Item label="Bienestar" value="bienestar" />
                      <Picker.Item label="Gastronomía" value="gastronomia" />
                      <Picker.Item label="Arte" value="arte" />
                      <Picker.Item label="Aventura" value="aventura" />
                      <Picker.Item label="Cultura" value="cultura" />
                    </Picker>
                  </View>

                  <TextInput
                      value={maxPrice}
                      onChangeText={setMaxPrice}
                      placeholder="Precio máximo"
                      keyboardType="numeric"
                      className="border border-gray-300 rounded-lg bg-white"
                  />

                  {loading && <Text>Cargando actividades...</Text>}
                  {error && <Text className="text-red-500">Error: {error}</Text>}
                  {!loading && !error && activities.length === 0 && (
                      <Text>No se encontraron actividades.</Text>
                  )}

                  <View className="gap-4">
                    {activities.map((activity) => (
                        <ActivityCard key={activity.activity_id} activity={activity} />
                    ))}
                  </View>
                </View>
              </ScrollView>
            </>
        )}
      </View>
  );
};

export default Activity;
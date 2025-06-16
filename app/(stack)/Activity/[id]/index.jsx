import { useState } from "react";
import { useFilteredActivities } from "../../../../hooks/useFilteredActivities";
import ActivityCard from "../../../../components/ActivityCard";
import { View, Text, TextInput, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";

const Activity = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const { activities, loading, error } = useFilteredActivities(
    search,
    category,
    maxPrice !== "" ? parseFloat(maxPrice) : Infinity
  );

  return (
    <ScrollView className="p-4">
      <Text className="text-2xl font-bold mb-4">Actividades Disponibles</Text>

      <View className="mb-6">
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar actividad..."
          className="border border-gray-300 rounded-md px-4 py-2 mb-4"
        />

        {/* Picker no soporta className, usa style si quieres personalizarlo más */}
        <View className="border border-gray-300 rounded-md mb-4">
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
          className="border border-gray-300 rounded-md px-4 py-2"
        />
      </View>

      {loading && <Text>Cargando actividades...</Text>}
      {error && <Text className="text-red-500">Error: {error}</Text>}
      {!loading && !error && activities.length === 0 && (
        <Text>No se encontraron actividades.</Text>
      )}

      <View className="gap-4">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Activity;
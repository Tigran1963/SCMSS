import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

// Имитация данных, полученных от ESP по Wi-Fi
const fetchCarData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "1", brand: "Toyota", model: "Camry", color: "Белый" },
        { id: "2", brand: "BMW", model: "X5", color: "Чёрный" },
        { id: "3", brand: "Audi", model: "A6", color: "Серебристый" },
      ]);
    }, 1500);
  });
};

const HomeScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Добро пожаловать в приложение!</Text>
  </View>
);

const MyCarsScreen = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCarData().then((data) => {
      setCars(data);
      setLoading(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.text}>Загрузка машин...</Text>
      ) : (
        <FlatList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.carItem}>
              <Text style={styles.text}>{`${item.brand} ${item.model} - ${item.color}`}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const SettingsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Настройки</Text>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Дом" component={HomeScreen} />
        <Tab.Screen name="Мои машины" component={MyCarsScreen} />
        <Tab.Screen name="Настройки" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
  carItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});

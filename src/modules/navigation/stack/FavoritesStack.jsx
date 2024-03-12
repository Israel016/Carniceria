import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import Favorites from "../../favorites/adapters/screens/Favorites";

const Stack = createStackNavigator();

export default function FavoritesStack() {
  return (
    <Stack.Navigator initialRouteName="Favoritos">
      <Stack.Screen
        name="Favoritos"
        options={{
          title: "Tus Favoritos",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
        component={Favorites}
      />
      {/* Puedes agregar más pantallas de favoritos según sea necesario */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
  },
  headerTitle: {
    color: "#000",
    fontSize: 20,
  },
});

import React from "react";
import { createStackNavigator } from "@react-navigation/stack"; 
import { View, Text, StyleSheet } from "react-native";
import Carrito from "../../carrito/adapters/screens/Carrito"; 
import Pagos from "../../home/adapters/screens/Pagos";
import Carnes from "../../home/adapters/screens/Carnes";


const Stack = createStackNavigator();

export default function CarritoStack() {
  return (
    <Stack.Navigator initialRouteName="Carrito">
      <Stack.Screen
        name="Carrito"
        options={{
          title: "Carrito de Compras",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
        component={Carrito}
      />
      <Stack.Screen
        name="Pagos"
        options={{
          title: "Pagos",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
        component={Pagos}
      />
      <Stack.Screen
        name="Carnes"
        options={{
          title: "Carnes",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
        component={Carnes}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white", // Puedes personalizar el color del encabezado
  },
  headerTitle: {
    color: "#000", // Puedes personalizar el color del texto del encabezado
    fontSize: 20,
  },
});

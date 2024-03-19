import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import Carnes from "../../home/adapters/screens/Carnes";
import Home from "../../home/adapters/screens/Home";
import Pagos from "../../home/adapters/screens/Pagos";
import Favorites from "../../favorites/adapters/screens/Favorites";
import PagosCarrito from "../../home/adapters/screens/PagosCarrito";
import Carrito from "../../carrito/adapters/screens/Carrito";



const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={{
          title: "Inicio",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
        component={Home}
      />
      <Stack.Screen
        name="Carnes"
        options={{
          title: "Detalles de Carne",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
        component={Carnes}
      />
      <Stack.Screen
        name="Pagos"
        options={{
          title: "Pagos ",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
        component={Pagos}
      />
      <Stack.Screen
        name="Carrito"
        options={{
          title: "Carrito",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
      >
        {({ route }) => <Carrito route={route} />}
      </Stack.Screen>
      <Stack.Screen
        name="Favorites"
        options={{
          title: "Favoritos",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
      >
        {({ route }) => <Favorites route={route} />}
      </Stack.Screen>
      <Stack.Screen
        name="PagosCarrito"
        options={{
          title: "Pagar Carrito",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
      >
        {({ route, navigation }) => <PagosCarrito route={route} navigation={navigation} />}
      </Stack.Screen>

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

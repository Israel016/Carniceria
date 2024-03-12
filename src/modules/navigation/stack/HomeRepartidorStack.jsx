import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeRepartidor from '../../home/adapters/screens/HomeRepartidor';
import Mapa from '../../home/adapters/screens/Mapa'

const Stack = createStackNavigator();
export default function HomeReaprtidorStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeRepartidor" component={HomeRepartidor} options={{
        title: 'Pedidos', headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold'
        }
      }} />
      <Stack.Screen name="Mapa" component={Mapa} options={{
                 headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: 'bold'
                }
            }} />
    </Stack.Navigator>
  )
}

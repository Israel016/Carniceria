import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Historial from '../../historial/adapters/screens/Historial';
import Ticket from "../../historial/adapters/screens/Ticket";

const Stack = createStackNavigator();
export default function HistorialStack() {
  return (
    <Stack.Navigator>
            <Stack.Screen name="Historial" component={Historial} options={{
                title: 'Historial', headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: 'bold'
                }
            }} />
            <Stack.Screen name="Ticket" component={Ticket} options={{
                title: 'Ticket', headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: 'bold'
                }
            }} />
        </Stack.Navigator>
  )
}

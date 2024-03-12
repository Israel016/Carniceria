import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Login from "../../auth/adapters/screens/Login";
import CreateAccount from "../../auth/adapters/screens/CreateAccount";
import UserGuest from "../../auth/adapters/screens/UserGuest";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();

export default function AuthStack({ navigation, setUserLoggedIn, loginUser }) {

    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                options={({ navigation }) => ({
                    headerRight: () => <HeaderRight navigation={navigation} />,
                    headerTitle: '',
                    headerLeft: null,
                    headerStyle: styles.header

                })}
            >
                {(props) => <Login {...props} loginUser={loginUser} setUserLoggedIn={setUserLoggedIn} navigation={navigation} />}
            </Stack.Screen>

            <Stack.Screen
                name="CreateAccount"
                options={({ navigation }) => ({
                    headerRight: () => <HeaderRight navigation={navigation} />,
                    headerTitle: '',
                    headerLeft: null,
                    headerStyle: styles.header
                })}
            >
                {(props) => <CreateAccount {...props} setUserLoggedIn={setUserLoggedIn} navigation={navigation} />}
            </Stack.Screen>

            <Stack.Screen
                name="UserGuest"
                component={UserGuest}
                options={{ title: 'Bienvenido' }}
            />
        </Stack.Navigator>
    )
}

const HeaderRight = ({ navigation }) => {
    return (
        <View style={{ backgroundColor: "#fff" }} >
            <View style={styles.headerRightContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.headerButtonText, styles.boldWhiteText]}>Iniciar sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
                    <Text style={[styles.headerButtonText, styles.boldWhiteText]}>Registrar</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#A2160F',
        height: 170,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerRightContainer: {
        flexDirection: 'row', // Alinea los elementos en el centro verticalmente
        marginBottom: -80, // Espacio entre el contenedor y la parte inferior del encabezado

    },
    headerButtonText: {
        fontSize: 16,
        color: 'white',
        marginHorizontal: 79, // Espacio horizontal entre los botones
        marginLeft: -20,

    },
    boldWhiteText: {
        fontWeight: 'bold',
        color: 'white',
    },
});


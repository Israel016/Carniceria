import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FavoritesStack from './stack/FavoritesStack';
import HomeStack from './stack/HomeStack';
import AuthStack from './stack/AuthStack';
import HistorialStack from './stack/HistorialStack';
import CarritoStack from './stack/CarritoStack';
import { CustomHeader } from '../../kernel/components/CustomHeader';
import Perfil from './stack/Perfil';
import PerfilRepartidor from './stack/PerfilRepartidor';
import HomeReaprtidorStack from './stack/HomeRepartidorStack'
import PerfilReaprtidor from './stack/PerfilRepartidor';





const Tab = createBottomTabNavigator();
const Navigation = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");

  const loginUser = async (email) => {
    if (email === 'user') {
      setUserLoggedIn(true);
      setUserType("user");
      await AsyncStorage.setItem('userLoggedIn', 'true');
      console.log("Usuario: ", email);
    } else if (email === 'repartidor') {
      setUserLoggedIn(true); await
        setUserType("repartidor");
      AsyncStorage.setItem('userLoggedIn', 'true');
      console.log("Repartidor: ", email);
    } else {
      alert('Correo electrónico incorrecto');
    }

  };


  return (
    <NavigationContainer >

      {userLoggedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            header: () => <CustomHeader />,
            tabBarIcon: ({ focused, color, size }) => {
              const { iconName, iconType } = getIconName(route.name, focused);
              const iconSize = focused ? 40 : 35;
              return <Icon name={iconName} type={iconType} size={iconSize} color={color} />;
            },
            tabBarActiveTintColor: '#A2160F',
            tabBarInactiveTintColor: 'black',
            tabBarStyle: { backgroundColor: '#fff', height: 85 },
          })}
        >
          {userType === 'repartidor' ? (
            <>
              <Tab.Screen name='HomeRepartidorStack' component={HomeReaprtidorStack} options={{ title: 'Inicio' }} />
              <Tab.Screen name='PerfilRepartidor' options={{ title: 'Perfil' }} >
                {() => <PerfilReaprtidor loginUser={loginUser} setUserLoggedIn={setUserLoggedIn} />}
              </Tab.Screen>
            </>
          ) : (
            <>

              <Tab.Screen name='HomeStack' component={HomeStack} options={{ title: 'Home' }} />
              <Tab.Screen name='CarritoStack' component={CarritoStack} options={{ title: 'Carrito' }} />
              <Tab.Screen name='FavoritesStack' component={FavoritesStack} options={{ title: 'Favoritos' }} />
              <Tab.Screen name='HistorialStack' component={HistorialStack} options={{ title: 'Historial' }} />
              <Tab.Screen name='Perfil' options={{ title: 'Perfil' }}>
                {() => <Perfil loginUser={loginUser} setUserLoggedIn={setUserLoggedIn} />}
              </Tab.Screen>
            </>
          )}
        </Tab.Navigator>
      ) : (<AuthStack loginUser={loginUser} setUserLoggedIn={setUserLoggedIn} />)}
    </NavigationContainer>
  );
};



const getIconName = (routeName, focused) => {
  let iconName = '';
  let iconType = 'material-community';

  switch (routeName) {
    case 'HomeStack':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'HomeRepartidorStack':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'CarritoStack':
      iconName = focused ? 'cart' : 'cart-outline';
      break;
    case 'FavoritesStack':
      iconName = focused ? 'heart' : 'heart-outline';
      break;
    case 'HistorialStack':
      iconName = focused ? 'history' : 'history';
      break;
    case 'Perfil':
      iconName = focused ? 'account' : 'account-outline';
      break;
    case 'PerfilRepartidor':
      iconName = focused ? 'account' : 'account-outline';
      break;
  }

  return { iconName, iconType };
};


export default Navigation;

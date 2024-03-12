import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const cardsData = [
  {
    key: '1',
    nombre: 'Costillas',
    descripcion: 'Carne jugosa y ligeramente grasosa, con un sabor distintivo.',
    precio: '120',
    imagen:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi5pXl04t41CFq_20fowX6WEJefpsv-de5fA&usqp=CAU',
  },
  {
    key: '2',
    nombre: 'Pierna',
    descripcion: 'Pierna de cerdo con hueso, ideal para hornear o asar a la parrilla.',
    precio: '145',
    imagen:
      'https://hebmx.vtexassets.com/arquivos/ids/612226/pierna-de-cerdo-c.jpg?v=638218537351030000',
  },
  // Agrega más objetos de tarjetas según sea necesario
];

const Home = () => {
  const navigation = useNavigation();

  const handleCardPress = async (card) => {
    // Obtén tarjetas actuales desde AsyncStorage
    let currentCards = await AsyncStorage.getItem('carrito');

    if (currentCards) {
      // Si hay tarjetas almacenadas, conviértelas de JSON a un array
      currentCards = JSON.parse(currentCards);
    } else {
      // Si no hay tarjetas almacenadas, inicializa con un array vacío
      currentCards = [];
    }

    // Agrega la nueva tarjeta
    currentCards.push(card);

    try {
      // Almacena el nuevo array de tarjetas en AsyncStorage
      await AsyncStorage.setItem('carrito', JSON.stringify(currentCards));
    } catch (error) {
      console.error('Error al almacenar tarjeta en AsyncStorage:', error);
    }

    // Navega a la pantalla de carrito
    navigation.navigate('Carrito');
  };

  const handleCardPress2 = (card) => {
    navigation.navigate('Carnes', card);
  };

  const handleCardPress3 = async (card) => {
    // Obtén tarjetas actuales desde AsyncStorage
    let currentCards = await AsyncStorage.getItem('favorites');

    if (currentCards) {
      // Si hay tarjetas almacenadas, conviértelas de JSON a un array
      currentCards = JSON.parse(currentCards);
    } else {
      // Si no hay tarjetas almacenadas, inicializa con un array vacío
      currentCards = [];
    }

    // Agrega la nueva tarjeta
    currentCards.push(card);

    try {
      // Almacena el nuevo array de tarjetas en AsyncStorage
      await AsyncStorage.setItem('favorites', JSON.stringify(currentCards));
    } catch (error) {
      console.error('Error al almacenar tarjeta en AsyncStorage:', error);
    }

    // Navega a la pantalla de carrito
    navigation.navigate('Favorites');
  };


  return (
    <ScrollView style={styles.container}>
      {cardsData.map((card, index) => (
        <TouchableOpacity key={card.key} onPress={() => handleCardPress2(card)}>
          <Card style={styles.card} elevation={5}>
            {/* Estructura de la tarjeta */}
            <View style={styles.contentWrapper}>
              <Image style={styles.image} source={{ uri: card.imagen }} />

              <View style={styles.textWrapper}>
                <View style={styles.titleWrapper}>
                  <Title style={styles.title}>{card.nombre}
                  </Title>
                  <Paragraph style={styles.paragraph}>31 piezas restantes</Paragraph>
                </View>
                <Paragraph style={styles.paragraph1}>{card.descripcion}</Paragraph>
                <View style={styles.bottomWrapper}>
                  <Text style={styles.price}>${card.precio}/1kg</Text>
                  <Icon
                    name="heart"
                    size={35}
                    color="#A2160F"
                    onPress={() => handleCardPress3(card)}
                  />
                  <Icon
                    name="cart"
                    size={35}
                    color="#A2160F"
                    onPress={() => handleCardPress(card)}
                  />
                </View>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  card: {
    borderRadius: 24,
    backgroundColor: '#f7f7f7',
    height: 'auto',
    marginBottom: 18,
  },
  contentWrapper: {
    flexDirection: 'row',
  },
  image: {
    width: 125,
    height: 140,
    resizeMode: 'cover',
    borderRadius: 14,
  },
  textWrapper: {
    flex: 1,
    marginLeft: 8,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#A2160F',
  },
  paragraph: {
    fontSize: 11,
    color: '#999',
    marginLeft: 8,
  },
  paragraph1: {
    fontSize: 11,
    color: '#000',
    marginLeft: 8,
  },
  bottomWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 70,
  },
  addButton: {
    borderRadius: 34,
    backgroundColor: '#A2160F',
    width: 100,
  },
});

export default Home;
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const Carrito = () => {
  const [cards, setCards] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Cargar tarjetas almacenadas en AsyncStorage al montar el componente
    loadCardsFromStorage();
  }, []);

  useEffect(() => {
    // Cargar tarjetas almacenadas en AsyncStorage cuando cambie el estado de cards
    loadCardsFromStorage();
  }, [cards]); // Agregamos cards como dependencia

  const loadCardsFromStorage = async () => {
    try {
      const storedCards = await AsyncStorage.getItem('carrito');
      if (storedCards) {
        // Si hay tarjetas almacenadas, actualizar el estado
        setCards(JSON.parse(storedCards));
      }
    } catch (error) {
      console.error('Error al cargar tarjetas desde AsyncStorage:', error);
    }
  };

  const removeCard = (index) => {
    // Copia el array actual de tarjetas
    const updatedCards = [...cards];
    // Elimina la tarjeta según el índice proporcionado
    updatedCards.splice(index, 1);
    // Actualiza el estado con las tarjetas actualizadas
    setCards(updatedCards);
    // Guarda las tarjetas actualizadas en AsyncStorage
    saveCardsToStorage(updatedCards);
  };

  const saveCardsToStorage = async (updatedCards) => {
    try {
      // Guarda las tarjetas actualizadas en AsyncStorage
      await AsyncStorage.setItem('carrito', JSON.stringify(updatedCards));
    } catch (error) {
      console.error('Error al guardar tarjetas en AsyncStorage:', error);
    }
  };

  // Verifica si cards está definido y no está vacío antes de renderizar
  if (!cards || cards.length === 0) {
    // Puedes mostrar un mensaje o hacer algo en caso de que cards sea undefined o vacío
    return (
      <View style={styles.imgContainer}>
        <Image
          source={require('../../../../../assets/carritoCompras.png')}
          style={{ width: 350, height: 320 }}
        />
        <Text style={{fontWeight: 'bold', fontSize: 28,  padding: 15}}>Upps!, El carrito de compras está vacio...</Text>
        <Text style={{fontSize: 20, marginTop: 10}}>!Vamos a llenarlo!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {cards.map((card, index) => (
        <TouchableOpacity key={index} onPress={() => navigation.navigate('Carnes', card)}>
          <Card style={styles.card} elevation={5}>
            <View style={styles.contentWrapper}>
              <Image style={styles.image} source={{ uri: card.imagen }} />

              <View style={styles.textWrapper}>
                <View style={styles.titleWrapper}>
                  <Title style={styles.title}>{card.nombre}</Title>
                  <Paragraph style={styles.paragraph}>31 piezas restantes</Paragraph>
                </View>
                <Paragraph style={styles.paragraph1}>{card.descripcion}</Paragraph>
                <View style={styles.bottomWrapper}>
                  <Text style={styles.price}>${card.precio}/kg</Text>
                  <TouchableOpacity onPress={() => removeCard(index)}>
                    <Icon name="delete" size={35} color="#A2160F" />
                  </TouchableOpacity>
                  {/* Puedes agregar más elementos según sea necesario */}
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
  imgContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
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
    marginRight: 120,
  },
});

export default Carrito;
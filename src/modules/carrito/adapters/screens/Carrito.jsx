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
    loadCardsFromStorage();
  }, []);

  useEffect(() => {
    loadCardsFromStorage();
  }, [cards]);

  const loadCardsFromStorage = async () => {
    try {
      const storedCards = await AsyncStorage.getItem('carrito');
      if (storedCards) {
        setCards(JSON.parse(storedCards));
      }
    } catch (error) {
      console.error('Error al cargar tarjetas desde AsyncStorage:', error);
    }
  };

  const removeCard = async (index) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
    await saveCardsToStorage(updatedCards);
  };

  const saveCardsToStorage = async (updatedCards) => {
    try {
      await AsyncStorage.setItem('carrito', JSON.stringify(updatedCards));
    } catch (error) {
      console.error('Error al guardar tarjetas en AsyncStorage:', error);
    }
  };

  const incrementKilos = (index) => {
    const updatedCards = [...cards];
    updatedCards[index].kilos += 1;
    setCards(updatedCards);
    saveCardsToStorage(updatedCards);
  };

  const decrementKilos = (index) => {
    const updatedCards = [...cards];
    if (updatedCards[index].kilos > 1) {
      updatedCards[index].kilos -= 1;
      setCards(updatedCards);
      saveCardsToStorage(updatedCards);
    }
  };

  const handleCompraDesdeCarrito = () => {
    navigation.navigate('Pagos', { productosEnCarrito: cards });
  };

  if (!cards || cards.length === 0) {
    return (
      <View style={styles.imgContainer}>
        <Image
          source={require('../../../../../assets/carritoCompras.png')}
          style={{ width: 350, height: 320 }}
        />
        <Text style={{ fontWeight: 'bold', fontSize: 28, padding: 15 }}>¡Upps!, El carrito de compras está vacío...</Text>
        <Text style={{ fontSize: 20, marginTop: 10 }}>¡Vamos a llenarlo!</Text>
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
                  <TouchableOpacity onPress={() => removeCard(index)}>
                    <Icon name="delete" size={35} color="#A2160F" />
                  </TouchableOpacity>
                </View>
                <View style={styles.bottomWrapper}>
                  <View style={styles.kilosCounter}>
                    <TouchableOpacity onPress={() => decrementKilos(index)}>
                      <Icon name="minus" size={25} color="#A2160F" />
                    </TouchableOpacity>
                    <Text style={styles.kilosText}>{card.kilos} kg</Text>
                    <TouchableOpacity onPress={() => incrementKilos(index)}>
                      <Icon name="plus" size={25} color="#A2160F" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.price}>${card.precio}/1kg</Text>
                </View>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.comprarButton} onPress={handleCompraDesdeCarrito}>
        <Text style={styles.comprarButtonText}>Comprar</Text>
      </TouchableOpacity>
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
    justifyContent: 'space-between',
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
    marginRight: 8,
  },
  kilosCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 10,
  },
  kilosText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A2160F',
    marginHorizontal: 8,
  },
  comprarButton: {
    backgroundColor: '#A2160F',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginVertical: 16,
  },
  comprarButtonText: {
    color: '#FFF',
    fontSize: 20,
    

  },
});

export default Carrito;

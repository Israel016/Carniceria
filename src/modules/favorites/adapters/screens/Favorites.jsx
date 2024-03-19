import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Cargar elementos almacenados en AsyncStorage al montar el componente
    loadFavoritesFromStorage();
  }, []);

  useEffect(() => {
    // Cargar elementos almacenados en AsyncStorage cuando cambie el estado de favorites
    loadFavoritesFromStorage();
  }, [favorites]); // Agregamos favorites como dependencia

  const loadFavoritesFromStorage = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        // Si hay elementos almacenados, actualizar el estado
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error al cargar elementos desde AsyncStorage:', error);
    }
  };

  const removeFavorite = (index) => {
    // Copia el array actual de favoritos
    const updatedFavorites = [...favorites];
    // Elimina el elemento según el índice proporcionado
    updatedFavorites.splice(index, 1);
    // Actualiza el estado con los elementos actualizados
    setFavorites(updatedFavorites);
    // Guarda los elementos actualizados en AsyncStorage
    saveFavoritesToStorage(updatedFavorites);
  };

  const saveFavoritesToStorage = async (updatedFavorites) => {
    try {
      // Guarda los elementos actualizados en AsyncStorage
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error al guardar elementos en AsyncStorage:', error);
    }
  };

  // Verifica si favorites está definido y no está vacío antes de renderizar
  if (!favorites || favorites.length === 0) {
    // Puedes mostrar un mensaje o hacer algo en caso de que favorites sea undefined o vacío
    return (
      <View style={styles.imgContainer}>
        <Image
          source={require('../../../../../assets/favoritos.png')}
          style={{ width: 370, height: 330 }}
        />
        <Text style={{fontWeight: 'bold', fontSize: 28,  padding: 16}}>Upps!, Aun no hay productos favoritos...</Text>
        <Text style={{fontSize: 20, marginTop: 2}}>!Vamos a buscarlos!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {favorites.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => navigation.navigate('Carnes', item)}>
          <Card style={styles.card} elevation={5}>
            <View style={styles.contentWrapper}>
              <Image style={styles.image} source={{ uri: item.imagen }} />

              <View style={styles.textWrapper}>
                <View style={styles.titleWrapper}>
                  <Title style={styles.title}>{item.nombre}</Title>
                  <Paragraph style={styles.paragraph}>31 piezas restantes</Paragraph>
                </View>
                <Paragraph style={styles.paragraph1}>{item.descripcion}</Paragraph>
                <View style={styles.bottomWrapper}>
                  <Text style={styles.price}>${item.precio}/kg</Text>
                  <TouchableOpacity onPress={() => removeFavorite(index)}>
                    <Icon name="heart" size={35} color="#A2160F" />
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

export default Favorites;

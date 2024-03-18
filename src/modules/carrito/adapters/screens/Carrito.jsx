import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TouchableOpacity, Modal, FlatList, Alert } from 'react-native';
import { Card, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Carrito = () => {
  const [cards, setCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [indexCorte, setIndexCorte] = useState(null);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      loadCardsFromStorage();
    }, [])
  );

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
    const updatedCards = cards.map((card, i) => {
      if (i === index) {
        return { ...card, kilos: card.kilos + 1 };
      }
      return card;
    });
    setCards(updatedCards);
  };

  const decrementKilos = (index) => {
    const updatedCards = cards.map((card, i) => {
      if (i === index && card.kilos > 1) {
        return { ...card, kilos: card.kilos - 1 };
      }
      return card;
    });
    setCards(updatedCards);
  };

  const calculateTotal = () => {
    return cards.reduce((total, card) => total + (card.kilos * card.precio) + (card.costoTipoCorte || 0), 0);
  };

  const handleOpenModal = (index) => {
    setIndexCorte(index);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleTipoCorteSelect = (tipoCorte, costo) => {
    const updatedCards = cards.map((card, i) => {
      if (i === indexCorte) {
        return { ...card, tipoCorteSeleccionado: tipoCorte, costoTipoCorte: costo };
      }
      return card;
    });

    setCards(updatedCards);
    handleCloseModal();
  };

  const tiposCorte = [
    { nombre: 'Sin corte', costo: 0 },
    { nombre: 'Para azar', costo: 15 },
    { nombre: 'En tiras', costo: 25 },
    { nombre: 'En cubos', costo: 30 },
    { nombre: 'En filetes', costo: 35 },
  ];

  return (
    <ScrollView style={styles.container}>
      {cards.map((card, index) => (
        <TouchableOpacity key={index} onPress={() => {}}>
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
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <TouchableOpacity onPress={() => handleOpenModal(index)}>
                    <Icon name="knife" size={35} color="#A2160F" />
                  </TouchableOpacity>
                  <Text>Tipo de Corte: {card.tipoCorteSeleccionado ? card.tipoCorteSeleccionado : 'No seleccionado'}</Text>
                </View>
                <View style={styles.bottomWrapper}>
                  <View style={styles.kilosWrapper}>
                    <TouchableOpacity onPress={() => decrementKilos(index)}>
                      <Icon name="minus-circle-outline" size={25} color="#A2160F" />
                    </TouchableOpacity>
                    <Text style={styles.kilos}>{card.kilos} kg</Text>
                    <TouchableOpacity onPress={() => incrementKilos(index)}>
                      <Icon name="plus-circle-outline" size={25} color="#A2160F" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.price}>${card.precio}/kg</Text>
                </View>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      ))}
      <View style={styles.checkoutContainer}>
        <Text style={styles.totalText}>Total a pagar</Text>
        <Text style={styles.totalPrice}>${calculateTotal().toFixed(2)}</Text>
        <TouchableOpacity
  style={styles.payButton}
  onPress={() => {
    // Verificar si todos los ítems tienen un tipo de corte seleccionado
    const allHaveCuts = cards.every(card => card.tipoCorteSeleccionado);

    if (!allHaveCuts) {
      // Si alguno no tiene, muestra una alerta
      Alert.alert(
        "Falta seleccionar cortes",
        "Por favor, selecciona un tipo de corte para toda la carne en tu carrito.",
        [{ text: "OK" }]
      );
    } else {
      // Si todos tienen, procede a la pantalla de pagos
      navigation.navigate('PagosCarrito', { compras: cards });
    }
  }}
>
  <Text style={styles.payButtonText}>Pagar</Text>
</TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tipos de Cortes Disponibles</Text>
            <FlatList
              data={tiposCorte}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleTipoCorteSelect(item.nombre, item.costo)} style={styles.item}>
                  <Text style={styles.itemText}>{item.nombre} - ${item.costo}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginBottom: 18,
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginBottom: 8,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#A2160F',
  },
  bottomWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 40,
  },
  kilosWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  kilos: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#A2160F',
    marginHorizontal: 10,
  },
  checkoutContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#e1e1e1',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A2160F',
  },
  payButton: {
    backgroundColor: '#A2160F',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  payButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,  // Esto es para Android
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#A2160F',  // Cambia el color del texto del título
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#A2160F',
    paddingVertical: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Carrito;

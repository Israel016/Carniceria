import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Modal, FlatList, ScrollView } from 'react-native';
import { Button, List, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Dialog, Portal } from 'react-native-paper';


const Carnes = ({ route }) => {
  const { nombre, descripcion, precio, imagen } = route.params;
  const [kilos, setKilos] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [tipoCorteSeleccionado, setTipoCorteSeleccionado] = useState(null);
  const [costoTipoCorte, setCostoTipoCorte] = useState(0);
  const [precioTotal, setPrecioTotal] = useState(precio); // Nuevo estado para el precio total
  const navigation = useNavigation();
  

  const handleIncrement = () => {
    setKilos(kilos + 1);
  };

  const handleDecrement = () => {
    if (kilos > 1) {
      setKilos(kilos - 1);
    }
  };

  const handleCompra = () => {
    if (!tipoCorteSeleccionado) {
      // Si no se ha seleccionado un tipo de corte, muestra un mensaje o toma la acción necesaria
      alert('Por favor, selecciona un tipo de corte antes de continuar.');
      return;
    }

    // Calcular el precio total considerando kilos y costo adicional del tipo de corte
    const precioTotalCalculado = (precio * kilos) + costoTipoCorte;

    // Actualizar el estado del precio total
    setPrecioTotal(precioTotalCalculado);

    // Navega a la pantalla de Pagos con los datos necesarios
    navigation.navigate('Pagos', {
      nombre,
      precio: precioTotalCalculado, // Usamos el precio total calculado
      kilos,
      tipoCorte: tipoCorteSeleccionado,
      costoTipoCorte,
    });
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const tiposCorte = [
    { nombre: 'Sin corte', costo: 0 },
    { nombre: 'Para azar', costo: 15 },
    { nombre: 'En tiras', costo: 25 },
    { nombre: 'En cubos', costo: 30 },
    { nombre: 'En filetes', costo: 35 },
    // Agrega más tipos de corte según sea necesario
  ];

  const handleTipoCorteSelect = (tipoCorte, costo) => {
    setTipoCorteSeleccionado(tipoCorte);
    setCostoTipoCorte(costo);
    handleCloseModal();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: imagen }} />
        <View style={styles.textContainer}>
          <Text style={styles.nombre}>{nombre}</Text>
          <Text style={styles.precio}>${precio}/1kg</Text>
          <Text style={styles.descripcion}>{descripcion}</Text>
        </View>

        {/* Contador de kilos y botón de suma en la parte inferior */}
        <View style={styles.counterContainer}>
          <TouchableOpacity onPress={handleDecrement}>
            <Icon name="minus" size={35} color="#A2160F" />
          </TouchableOpacity>
          <Text style={styles.kilosText}>{kilos} kg</Text>
          <TouchableOpacity onPress={handleIncrement}>
            <Icon name="plus" size={35} color="#A2160F" />
          </TouchableOpacity>
          {/* Botón de tipos de corte alineado a la derecha */}
          <View style={styles.rightContainer}>
            <Button style={styles.btns} mode="contained" color="#A2160F" onPress={handleOpenModal}>
              Tipos de Corte
            </Button>
          </View>
        </View>

        {/* Modal para mostrar la lista de tipos de corte */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Tipos de cortes para tu Carne</Text>
              <Divider />
              <FlatList
                data={tiposCorte}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <List.Item
                    title={`${item.nombre} - Costo: $${item.costo}`}
                    onPress={() => handleTipoCorteSelect(item.nombre, item.costo)}
                  />
                )}
              />
            </View>
          </View>
        </Modal>

        {/* Información sobre el tipo de corte seleccionado y su costo */}
        <View style={styles.infoContainer}>
          {tipoCorteSeleccionado && (
            <Text style={styles.infoText}>
              {tipoCorteSeleccionado} - Costo extra: ${costoTipoCorte}
            </Text>
          )}
        </View>

        {/* Precio total */}
        <Text style={styles.infoText}>Precio total: ${precioTotal}</Text>

        {/* Botón de Comprar */}
        <View style={styles.counterContainer}>
          <Button style={styles.btns} mode="contained" color="#A2160F" onPress={handleCompra}>
            Comprar
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 250,
    borderRadius: 20,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
  nombre: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#A2160F',
    marginBottom: 8,
  },
  descripcion: {
    fontSize: 18,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  precio: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  kilosText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A2160F',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end', // Alinea el contenido a la derecha
  },
  btns: {
    backgroundColor: '#A2160F',
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
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    color: '#A2160F',
    fontWeight: 'bold',

  },
});

export default Carnes;

import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import Modal from 'react-native-modal';

const Pagos = ({ route, navigation }) => {
  const { nombre, precio, kilos, tipoCorte, costoTipoCorte } = route.params;

  const precioTotal = precio;
  const precioCarne = precio - costoTipoCorte;

  const [isModalVisible, setModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleModal = () => {
    Animated.timing(fadeAnim, {
      toValue: isModalVisible ? 0 : 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(!isModalVisible); // Cambiar el estado después de completar la animación
    });
  };
  

  const handleConfirmarPago = () => {
    console.log('Pago confirmado');

    // Mostrar el modal "Pago Realizado"
    toggleModal();

    // Navegar a la pantalla Home después de 2 segundos
    setTimeout(() => {
      navigation.navigate('Home');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Detalles del Pago</Text>
      </View>

      <View style={styles.detailsContainer}>
        {renderDetailItem('Nombre', nombre)}
        {renderDetailItem('Precio Carne', `$${precioCarne.toFixed(2)}`, styles.carneItem)}
        {renderDetailItem('Costo Tipo de Corte', `$${costoTipoCorte.toFixed(2)}`, styles.corteItem)}
        {renderDetailItem('Kilos', `${kilos} kg`)}
        {renderDetailItem('Tipo de Corte', tipoCorte)}
        {renderDetailItem('Precio Total', `$${precioTotal.toFixed(2)}`, styles.totalItem)}
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmarPago}>
        <Text style={styles.confirmButtonText}>Confirmar Pago</Text>
      </TouchableOpacity>

      {/* Modal de Pago Realizado */}
      <Modal isVisible={isModalVisible} animationIn="fadeIn" animationOut="fadeOut" backdropOpacity={0.5}>
        <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
          <Text style={styles.modalTitle}>¡Pago Realizado!</Text>
          <Text style={styles.modalText}>Gracias por tu compra.</Text>
        </Animated.View>
      </Modal>
    </View>
  );
};

const renderDetailItem = (label, value, style) => (
  <View style={[styles.detailItem, style]} key={label}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#A2160F',
    textAlign: 'center',
  },
  detailsContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 16,
    elevation: 5,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 18,
    color: '#A2160F',
  },
  carneItem: {
    backgroundColor: '#FFEBE6',
  },
  corteItem: {
    backgroundColor: '#FFF7E6',
  },
  totalItem: {
    backgroundColor: '#E6F7FF',
  },
  confirmButton: {
    backgroundColor: '#A2160F',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Estilos del modal
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#A2160F',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
});

export default Pagos;

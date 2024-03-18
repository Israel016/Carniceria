import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, ScrollView, SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PagosCarrito = ({ route, navigation }) => {
    const { compras } = route.params;
    const [isModalVisible, setModalVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const toggleModal = () => {
        Animated.timing(fadeAnim, {
            toValue: isModalVisible ? 0 : 1,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {
            setModalVisible(!isModalVisible);
        });
    };
    
    const handleConfirmarPago = async () => {
        console.log('Pago confirmado');
        toggleModal();
    
        try {
            await AsyncStorage.removeItem('carrito');
            console.log('Carrito borrado exitosamente');
        } catch (error) {
            console.error('Error al borrar el carrito:', error);
        }
    
        setTimeout(() => {
            navigation.navigate('Carrito', { shouldRefresh: true });
        }, 2000);
    };
    
    const calculateTotal = () => {
        return compras.reduce((total, item) => total + (item.precio * item.kilos) + item.costoTipoCorte, 0);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.header}>
                    <Text style={styles.title}>Detalles del Pago</Text>
                </View>
                {compras.map((compra, index) => (
                    <View key={index} style={styles.compraContainer}>
                        <Text style={styles.compraTitle}>{compra.nombre} - {compra.kilos} kg</Text>
                        <View style={styles.compraDetailContainer}>
                            <Text style={styles.compraDetail}>Precio: ${parseFloat(compra.precio).toFixed(2)}/kg</Text>
                            <Text style={styles.compraDetail}>Tipo de Corte: {compra.tipoCorte} - ${parseFloat(compra.costoTipoCorte).toFixed(2)}</Text>
                            <Text style={styles.compraDetail}>Subtotal: ${(parseFloat(compra.precio) * compra.kilos + parseFloat(compra.costoTipoCorte)).toFixed(2)}</Text>
                        </View>
                    </View>
                ))}
                <View style={styles.totalContainer}>
                    <Text style={styles.total}>Total: ${calculateTotal().toFixed(2)}</Text>
                </View>
                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmarPago}>
                    <Text style={styles.confirmButtonText}>Confirmar Pago</Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal isVisible={isModalVisible} animationIn="fadeIn" animationOut="fadeOut" backdropOpacity={0.5}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>¡Pago Realizado!</Text>
                    <Text style={styles.modalText}>Gracias por tu compra.</Text>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    scrollView: {
        marginHorizontal: 10,
    },
    header: {
        marginTop: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    compraContainer: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    compraTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#444',
    },
    compraDetailContainer: {
        borderTopColor: '#eee',
        borderTopWidth: 1,
        marginTop: 10,
        paddingTop: 10,
    },
    compraDetail: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
    },
    totalContainer: {
        marginTop: 10,
        padding: 15,
        alignItems: 'flex-end',
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#444',
    },
    confirmButton: {
        backgroundColor: '#00a680',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 20,
    },
    confirmButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 18,
        color: '#555',
        textAlign: 'center',
    },
});

export default PagosCarrito;

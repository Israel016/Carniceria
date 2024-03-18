import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, ScrollView, SafeAreaView, Easing, Image } from 'react-native';
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
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.header}>
                    <Text style={styles.title}>Detalles del Pago</Text>
                </View>
                {compras.map((compra, index) => (
                    <View key={index} style={styles.compraContainer}>
                        <Text style={styles.compraTitle}>Llevas: {compra.kilos} kg de {compra.nombre} </Text>
                        
                        <View style={styles.compraDetailContainer}>
                            <Text style={styles.compraDetail}>Precio: ${parseFloat(compra.precio).toFixed(2)}/1kg</Text>
                            <Text style={styles.compraDetail}>Estilo del Corte: {compra.nombreCorte}</Text>
                            <Text style={styles.compraDetail}>Precio de Corte: ${parseFloat(compra.costoTipoCorte).toFixed(2)}</Text>
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
                    <Image source={require('../../../../../assets/logo.png')} style={styles.modalImage} />
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
        backgroundColor: '#FFF',
    },
    scrollView: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#A2160F',
    },
    compraContainer: {
        backgroundColor: '#F9F9F9',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    compraTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#A2160F',
    },
    compraDetailContainer: {},
    compraDetail: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555555',
    },
    totalContainer: {
        paddingVertical: 20,
        alignItems: 'flex-end',
    },
    total: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#A2160F',
    },
    confirmButton: {
        backgroundColor: '#A2160F',
        paddingVertical: 10,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    modalContainer: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#A2160F',
    },
    modalText: {
        fontSize: 18,
        color: '#555555',
        textAlign: 'center',
    },
});

export default PagosCarrito;

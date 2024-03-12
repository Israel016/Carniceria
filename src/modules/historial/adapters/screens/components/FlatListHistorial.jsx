import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from '@rneui/base';

export default function FlatListHistorial(props) {
    const { navigation } = props;
    const { image, price, description, status, date } = props;
    const statusStyle = status === 'Entregado' ? styles.entregado : (status === 'Pendiente' ? styles.pendiente : styles.cancelado);

    return (
        <View style={styles.row}>
            <Image source={{ uri: image, }} style={styles.image} />
            <View style={{ flex: 1, flexDirection: 'colum', marginLeft: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.price}>{price}</Text>
                    <Text style={[styles.status, statusStyle]}>{status}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.description}>{description}</Text>
                    <Text style={styles.description}>{date}</Text>
                    <View style={styles.moreInfoContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Ticket')}>
                            <Text style={[styles.textDot, { fontSize: 20 }, { marginBottom: -15 }]}>•</Text>
                            <Text style={[styles.textDot, { fontSize: 20 }, { marginBottom: -15 }]}>•</Text>
                            <Text style={[styles.textDot, { fontSize: 20 }, { marginBottom: -15 }]}>•</Text>
                            
                        </TouchableOpacity>
                    </View>
                    
                </View>




            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        //para IOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        //para Android
        elevation: 3,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 8,
        marginBottom: 8
    },
    image: {
        width: 124,
        height: 100,
        borderRadius: 12
    },
    price: {
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold'
    },
    description: {
        marginTop: 10,
        fontSize: 15
    },
    status: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    entregado: {
        color: 'green',
    },
    pendiente: {
        color: 'orange',
    },
    cancelado: {
        color: 'red',
    },

    moreInfoContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',

    },
    textDot: {
        fontWeight: 'bold',
    },

})
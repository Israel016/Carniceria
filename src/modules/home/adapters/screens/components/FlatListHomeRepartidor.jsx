import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from '@rneui/base';
import { Icon } from '@rneui/themed';


export default function HomeRepartidorStack(props) {
    const { navigation } = props;
    const { image, name, description, status } = props;
    const statusStyle = status === 'Entregado' ? styles.entregado : (status === 'Pendiente' ? styles.pendiente : styles.cancelado);

    return (
        <View style={styles.row}>
            <Image source={{ uri: image, }} style={styles.image} />
            <View style={{ flex: 1, flexDirection: 'colum', marginLeft: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={[styles.status, statusStyle]}>{status}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{flex: 1}}>
                    <Text style={styles.description}>{description}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Mapa')}>
                        <View style={styles.icon}>
                            <Icon
                                name='map-marker-distance'
                                type='material-community'
                                color='#A2160F'
                                size={40}
                                
                            />
                        </View>
                    </TouchableOpacity>
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
        shadowOpacity: 0.2,
        shadowRadius: 4,
        //para Android
        elevation: 3,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 8,
        marginBottom: 8,
    },

    image: {
        width: 110,
        height: 100,
        borderRadius: 12
    },
    name: {
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold'
    },
    description: {
        marginTop: 10,
        marginRight: 10,
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
    icon: {
        flex: 1,
        borderRadius: 10,  
        borderColor: '#A2160F',
        borderWidth: 2,
    }
})
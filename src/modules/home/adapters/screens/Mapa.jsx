import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Button } from '@rneui/base'


export default function Mapa() {
    // Coordenadas de la ruta de partida y llegada (por ejemplo)
    const coordenadasPartida = { latitude: 18.850349701772906, longitude: -99.20071519761946 };
    const coordenadasLlegada = { latitude: 18.88192862158276, longitude: -99.17669984285246 };

    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 18.850349701772906,
                        longitude: -99.20071519761946,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {/* Marcador de la ruta de partida */}
                    <Marker
                        coordinate={coordenadasPartida}
                        title="Ruta de partida"
                        pinColor="blue" // Color del marcador
                    />
                    {/* Marcador de la ruta de llegada */}
                    <Marker
                        coordinate={coordenadasLlegada}
                        title="Ruta de llegada"
                        pinColor="green" // Color del marcador
                    />
                </MapView>
            </View>
            <View style={styles.informacion}>
                <View style={styles.infoTitulo}>
                    <Text style={{ color: 'white' }}>Informacion del Pedido</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20,  }}>
                    <View style={{ flex: 1 }}>
                    <Text style={styles.text}>Nombre:</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                    <Text style={styles.text}>Juanita Torrez</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.text}>Contacto:</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.text}>777 258 96 74</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.text}>Referencia:</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.text}>A un lado de la colonia Pedregal</Text>
                    </View>
                </View>
                <View style={styles.btnView}>
                    <Button
                        title='Entregar'
                        onPress={""}
                        containerStyle={styles.btnContainer}
                        buttonStyle={styles.btnStyle}
                        titleStyle={{ color: 'white' }} />
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    mapContainer: {
        flex: 1
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    informacion: {
        backgroundColor: '#fff', // Cambia al color que desees
        borderTopWidth: 1,
        borderColor: '#ccc',
        paddingBottom: 5,
    },
    infoTitulo: {
        backgroundColor: '#A2160F',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    text: {
        fontSize: 17
    },
    btnView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnStyle: {
        backgroundColor: '#A2160F',
        borderRadius: 30,
    },
    btnContainer: {
        width: '60%',
        marginTop: 10,
    },
});

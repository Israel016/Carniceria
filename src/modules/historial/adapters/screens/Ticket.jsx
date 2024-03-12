import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

export default function Ticket(props) {

  return (

    <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.fondoTitle}>
          <Text style={styles.titleInfo}>General</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text1}>Fecha de Solicitud:</Text>
          <Text style={styles.text2}>15-Enero-2024</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text1}>Dirección de Entrega:</Text>
          <Text style={styles.text2}>Ciudad Independencia, Emiliano Zapata</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text1}>Estado del Pedido:</Text>
          <Text style={styles.text2}>Pendiente</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text1}>Total:</Text>
          <Text style={styles.text2}>$954.00</Text>
        </View>

        <View style={styles.fondoTitle}>
          <Text style={styles.titleInfo2}>Repartidor</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text1}>Nombre:</Text>
          <Text style={styles.text2}>Juan Peréz</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text1}>Contacto:</Text>
          <Text style={styles.text2}>777-606-20-12</Text>
        </View>

        <View style={styles.fondoTitle}>
          <Text style={styles.titleInfo3}>Productos</Text>
        </View>


        <View style={styles.cardProductos}>
          <View style={styles.row2}>
            <Text style={styles.textProductos1}>Corte:</Text>
            <Text style={styles.textProductos2}>Costilla $200/kg</Text>
          </View>
          <View style={styles.row2}>
            <Text style={styles.textProductos1}>Detalles:</Text>
            <Text style={styles.textProductos2}>Carne Jugosa y ligeramente grasosa, con un sabor delicioso.</Text>
          </View>
          <View style={styles.row2}>
            <Text style={styles.textProductos1}>Kilo(s):</Text>
            <Text style={styles.textProductos2}>3</Text>
          </View>
          <View style={styles.row2}>
            <Text style={styles.textProductos1}>Total:</Text>
            <Text style={styles.textProductos2}>$600.00</Text>
          </View>
        </View>

        <View style={styles.cardProductos}>
          <View style={styles.row2}>
            <Text style={styles.textProductos1}>Corte:</Text>
            <Text style={styles.textProductos2}>Lomo $150/kg</Text>
          </View>
          <View style={styles.row2}>
            <Text style={styles.textProductos1}>Detalles:</Text>
            <Text style={styles.textProductos2}>Carne Suave y deliciosa.</Text>
          </View>
          <View style={styles.row2}>
            <Text style={styles.textProductos1}>Kilo(s):</Text>
            <Text style={styles.textProductos2}>5</Text>
          </View>
          <View style={styles.row2}>
            <Text style={styles.textProductos1}>Total:</Text>
            <Text style={styles.textProductos2}>$354.00</Text>
          </View>
        </View>

      </View>
    </ScrollView >

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 14,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: 0,
  },
  scrollView: {
    backgroundColor: "#fff"
  },
  titleInfo: {
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: '#A2160F',
    color: 'white',
    paddingVertical: 3,
    paddingHorizontal: 140,

  },
  titleInfo2: {
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: '#A2160F',
    color: 'white',
    paddingVertical: 3,
    paddingHorizontal: 127,
    

  },
  titleInfo3: {
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: '#A2160F',
    color: 'white',
    paddingVertical: 3,
    paddingHorizontal: 127,

  },
  row: {
    flexDirection: 'row',
    padding: 12,
    marginTop: -12,

  },
  row2: {
    flexDirection: 'row',
    padding: 12,
    marginTop: -8,

  },
  text1: {
    flex: 1,
    marginRight: 22,
    fontSize: 18,
    marginTop: 1
  },
  text2: {
    flex: 1,
    fontSize: 18,
    marginLeft: 40
  },
  textProductos1: {
    flex: 1,
    marginRight: 22,
    fontSize: 18,
  },
  textProductos2: {
    fontSize: 18,
    marginLeft: 40,
    maxWidth: 165,
  },
  cardProductos: {
    marginTop: 15,
    //para IOS
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: 340,
    //para Android
    elevation: 3,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 15,
    marginBottom: 8
  }, 
  fondoTitle: {
    borderRadius: 10, 
    overflow: 'hidden', 
  }

})


import { StyleSheet, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import FlatListHistorial from './components/FlatListHistorial'


export default function Historial({ navigation }) {
  const historialStatic = [
    {
      id: '1',
      price: '$954.00',
      description: 'Juan Peréz',
      status: 'Pendiente',
      date: '15-01-2024',
      image: 'https://i.blogs.es/bb38b8/costillas_horno/840_560.jpg'
    },
    {
      id: '2',
      price: '$1,897.00',
      description: 'Juan Peréz',
      status: 'Entregado',
      date: '08-02-2024',
      image: 'https://www.tresjotas.com/wp-content/uploads/2018/08/Lomo-Ancho-Receta.jpg'
    },
    {
      id: '3',
      price: '$1,230.00',
      description: 'Juan Peréz',
      status: 'Cancelado',
      date: '22-02-2024',
      image: 'https://cdn.shopify.com/s/files/1/0353/9678/0091/products/piernapuercocrudasinhueso2.jpg?v=1639605291'
    },
   
  ];
  
 
  return (
    <View style={styles.container}>
      
      <FlatList
        data={historialStatic}
        renderItem={({ item }) => 
          <FlatListHistorial navigation={navigation} image={item.image} price={item.price} description={item.description} status={item.status} date={item.date} /> 
        }
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16.
  },

})

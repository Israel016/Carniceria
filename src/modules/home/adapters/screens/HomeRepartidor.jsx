import { StyleSheet, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import FlatListHomeRepartidor from './components/FlatListHomeRepartidor'


export default function HomeRepartidor({ navigation }) {
  const historialStatic = [
    {
      id: '1',
      name: 'Juanita Torrez',
      description: 'Av. Independencia No.112, Cuenravaca Morelos',
      status: 'Pendiente',
      image: 'https://hansjoerg.me/img/avatar.png'
    },
    {
      id: '2',
      name: 'Oscar Velazquez',
      description: 'Av. Tulipanes No.16, Temixo Morelos',
      status: 'Entregado',
      image: 'https://hansjoerg.me/img/avatar.png'
    },
    {
      id: '3',
      name: 'Esther Reyes',
      description: 'Av. 10 de Abril No.52, Cuernavaca Morelos',
      status: 'Cancelado',
      image: 'https://hansjoerg.me/img/avatar.png'
    },
   
  ];
  
 
  return (
    <View style={styles.container}>
      
      <FlatList
        data={historialStatic}
        renderItem={({ item }) => 
          <FlatListHomeRepartidor navigation={navigation} image={item.image} name={item.name} description={item.description} status={item.status} /> 
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
    padding: 3
  },

})

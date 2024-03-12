import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
export { CustomHeader };

const CustomHeader = () => (
  <View style={{backgroundColor: '#fff'}}> 
    <View style={styles.header}>
      {/* Puedes ajustar el estilo y el contenido según tus necesidades */}
      <Image source={require('../../../assets/logo.png')} style={styles.headerImage} />
    </View>
  </View>
    
  );

  const styles = StyleSheet.create({
    header: {
      backgroundColor: '#A2160F',
      alignItems: 'center',
      justifyContent: 'center',
      height: 140, // Ajusta la altura según tus necesidades
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      marginBottom: 80
    },
    headerImage: {
      marginTop: 120,
      width: 170, // Ajusta el ancho según tus necesidades
      height: 170, // Ajusta la altura según tus necesidades
      borderRadius: 120, 
      backgroundColor:'white'
  },
  });
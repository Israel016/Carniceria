import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Button, Input, Icon } from '@rneui/base'
import React, { useState } from 'react'
import Loading from '../../../../src/kernel/components/Loading';


export default function PerfilReaprtidor({ setUserLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [showMessage1, setShowMessage1] = useState('');
  const [showMessage2, setShowMessage2] = useState('');
  const [showPassword1, setShowPassword1] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  const [visible, setVisible] = useState(false);


  const logout = () => {
    setUserLoggedIn(false);
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.name}>Juan Pérez</Text>
        <View style={styles.row}>
          <Text style={styles.username}>juanperez123</Text>
          <Text style={styles.phoneNumber}>777-123-45-67</Text>
        </View>

        <View>
          <View>
            <Text style={styles.titleInfo}>Actualizar Información</Text>
          </View>
        </View>
        <View style={styles.actualizarInfo}>
          <View style={styles.viewText}><Text style={styles.text}>Nombre: *</Text></View>
          <Input
            onChange={({ nativeEvent: { text } }) => setEmail(text)} labelStyle={styles.label}
            containerStyle={styles.input} errorMessage={showMessage1}
            inputContainerStyle={styles.inputStyle}
          />
          <View style={styles.viewText}><Text style={styles.text}>Apellido: *</Text></View>

          <Input
            onChange={({ nativeEvent: { text } }) => setEmail(text)} labelStyle={styles.label}
            containerStyle={styles.input} errorMessage={showMessage1}
            inputContainerStyle={styles.inputStyle}
          />

          <View style={styles.viewText}><Text style={styles.text}>Teléfono: *</Text></View>
          <Input keyboardType='phone-pad'
            onChange={({ nativeEvent: { text } }) => setEmail(text)} labelStyle={styles.label}
            containerStyle={styles.input} errorMessage={showMessage1}
            inputContainerStyle={styles.inputStyle}
          />

          <Button
            title='Actualizar'
            onPress={"#"}
            containerStyle={styles.btnContainerA}
            buttonStyle={styles.btnStyleA}
            titleStyle={{ color: 'white' }} />
          <Loading visible={visible} title='Información Actualizada' />
        </View>

        <View>
          <View>
            <Text style={styles.titleInfoC}>Cambiar Contraseña</Text>
          </View>
        </View>
        <View style={styles.actualizarInfo}>
          <View style={styles.viewText}><Text style={styles.text}>Contraseña: *</Text></View>
          <Input placeholder='********'
            onChange={({ nativeEvent: { text } }) => setPassword1(text)} labelStyle={styles.label}
            containerStyle={styles.input} errorMessage={showMessage2} secureTextEntry={showPassword1}
            inputContainerStyle={styles.inputStyle}
            rightIcon={
              <Icon type='material-community' name={showPassword1 ? 'eye-outline' : 'eye-off-outline'} color='tomato' onPress={() => setShowPassword1(!showPassword1)} />
            }
          />
          <View style={styles.viewText}><Text style={styles.text}>Confirmar Contraseña: *</Text></View>
          <Input placeholder='********'
            onChange={({ nativeEvent: { text } }) => setPassword2(text)} labelStyle={styles.label}
            containerStyle={styles.input} errorMessage={showMessage2} secureTextEntry={showPassword2}
            inputContainerStyle={styles.inputStyle}
            rightIcon={
              <Icon type='material-community' name={showPassword2 ? 'eye-outline' : 'eye-off-outline'} color='tomato' onPress={() => setShowPassword2(!showPassword2)} />
            }
          />

          <Button
            title='Actualizar'
            onPress={"#"}
            containerStyle={styles.btnContainerA}
            buttonStyle={styles.btnStyleA}
            titleStyle={{ color: 'white' }} />
          <Loading visible={visible} title='Contraseña Actualizada' />
        </View>
        <Button
          title='Cerrar Sesion'
          onPress={logout}
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btnStyle}
          titleStyle={{ color: 'white' }} />
      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 16,
  },
  btnStyle: {
    backgroundColor: '#A2160F',
    borderRadius: 30,
  },
  btnContainer: {
    width: '80%',
    marginTop: 10,
  },
  btnStyleA: {
    backgroundColor: '#A2160F',
  },
  btnContainerA: {
    width: '80%',
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    padding: 16,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 28
  },
  username: {
    marginRight: 15,
    fontSize: 18
  },
  phoneNumber: {
    marginLeft: 15,
    fontSize: 18
  },
  titleInfo: {
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: '#A2160F',
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 80,
  },
  titleInfoC: {
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: '#A2160F',
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 89,
    marginTop: 30,
  },
  actualizarInfo: {
    alignItems: 'center',
    paddingHorizontal: 10.5,
    borderTopColor: '#A2160F',
    borderTopWidth: 2,
    borderBottomColor: '#A2160F',
    borderBottomWidth: 2,
    borderLeftColor: '#A2160F',
    borderLeftWidth: 2,
    borderRightColor: '#A2160F',
    borderRightWidth: 2,

  },
  text: {
    color: 'black',
    fontSize: 15,
    marginTop: 10
  },
  label: {
    color: 'tomato'
  },
  input: {
    paddingHorizontal: 16,
    marginVertical: 18,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      height: 4,
    },
    shadowOpacity: 0.27, // Opacidad de la sombra
    shadowRadius: 4.65, // Radio de la sombra
    elevation: 6, // Elevación en Android para crear el efecto de sombra
    height: 50, // Ajusta la altura para cubrir la línea
    width: 300,
    borderBottomColor: 'transparent', // Establece el color del borde inferior igual al color de fondo para ocultar la línea en iOS

  },
  inputStyle: {
    borderBottomWidth: 0
  },
  viewText: {
    marginBottom: -16,
    width: 330,
    alignItems: 'flex-start',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: 0,
  },
  scrollView: {
    backgroundColor: "#fff"
  },
})
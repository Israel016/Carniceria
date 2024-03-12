import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Input, Button, Icon } from '@rneui/base';
import { isEmpty } from 'lodash';
import Loading from '../../../../kernel/components/Loading';

export default function CreateAccount() {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [showPassword1, setShowPassword1] = useState(true);
    const [showPassword2, setShowPassword2] = useState(true);
    const [showMessage1, setShowMessage1] = useState('');
    const [showMessage2, setShowMessage2] = useState('');
    const [visible, setVisible] = useState(false);



    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.viewText}><Text style={styles.text}>Nombre: *</Text></View>

                <Input placeholder='Juan'
                    onChange={({ nativeEvent: { text } }) => setEmail(text)} labelStyle={styles.label}
                    containerStyle={styles.input} errorMessage={showMessage1}
                    inputContainerStyle={styles.inputStyle}

                />
                <View style={styles.viewText}><Text style={styles.text}>Apellido: *</Text></View>

                <Input placeholder='Perez'
                    onChange={({ nativeEvent: { text } }) => setEmail(text)} labelStyle={styles.label}
                    containerStyle={styles.input} errorMessage={showMessage1}
                    inputContainerStyle={styles.inputStyle}

                />
                <View style={styles.viewText}><Text style={styles.text}>Teléfono: *</Text></View>
                <Input placeholder='777 123 45 67' keyboardType='phone-pad'
                    onChange={({ nativeEvent: { text } }) => setEmail(text)} labelStyle={styles.label}
                    containerStyle={styles.input} errorMessage={showMessage1}
                    inputContainerStyle={styles.inputStyle}

                />
                <View style={styles.viewText}><Text style={styles.text}>Correo electrónico: *</Text></View>
                <Input placeholder='example@gmail.com' keyboardType='email-address'
                    onChange={({ nativeEvent: { text } }) => setEmail(text)} labelStyle={styles.label}
                    containerStyle={styles.input} errorMessage={showMessage1}
                    inputContainerStyle={styles.inputStyle}
                />
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
                <Button title='Registrarse' onPress={''} containerStyle={styles.btnContainer} buttonStyle={styles.btnStyle} titleStyle={{ color: "white" }} />
                <Loading visible={visible} title='Creando Cuenta' />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20

    },
    text: {
        color: 'black',
        fontSize: 18
    },
    label: {
        color: 'tomato'
        
    },
    input: {
        paddingHorizontal: 16,
        marginVertical: 18,
        backgroundColor: 'white', // Ajusta el color de fondo según tus necesidades
        borderRadius: 18, // Aplica bordes redondeados para formar un óvalo
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.27, // Opacidad de la sombra
        shadowRadius: 4.65, // Radio de la sombra
        elevation: 6, // Elevación en Android para crear el efecto de sombra
        height: 50, // Ajusta la altura para cubrir la línea
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
    btnContainer: {
        width: '80%'
    },
    btnStyle: {
        backgroundColor: '#A2160F',
        borderRadius: 30
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    scrollView: {
        backgroundColor: "#fff", // Ajusta el color de fondo según tus necesidades
      },
});
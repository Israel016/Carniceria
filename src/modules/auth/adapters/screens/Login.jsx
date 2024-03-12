import React, { useState } from "react";
import { Input, Button, Image, Icon, Text } from '@rneui/base';
import { View, StyleSheet, Alert } from 'react-native';
import { isEmpty, set } from 'lodash';
import { Overlay, } from 'react-native-elements';


export default function Login(props) {
    const { navigation, setUserLoggedIn } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [isOverlayVisible, setOverlayVisible] = useState(false); // Estado para controlar la visibilidad del Overlay

    const [isForgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [isEmailSent, setIsEmailSent] = useState(false);


    const login = () => {
        // proceso inicio de sesion
        if (!isEmpty(email) && !isEmpty(password)) {
            props.loginUser(email);
            if (email === "user") {
                console.log("datos:", email, password);

                setEmail("");
                setPassword("");

                // Muestra la alerta de inicio de sesión exitoso
                setOverlayVisible(true);

                // Oculta el mensaje de inicio de sesion después de 2 segundos
                setTimeout(() => {
                    setOverlayVisible(false);
                    setUserLoggedIn(true);
                }, 1000);

            } else if (email === "repartidor") {
                console.log("datos:", email, password);

                setEmail("");
                setPassword("");

                // Muestra la alerta de inicio de sesión exitoso
                setOverlayVisible(true);

                // Oculta el mensaje de inicio de sesion después de 2 segundos
                setTimeout(() => {
                    setOverlayVisible(false);
                    setUserLoggedIn(true);
                }, 1000);


            } else {
                alert("Correo electronico incorrecto");
            }
        } else {
            setEmailErrorMessage('Campo obligatorio para el correo electrónico');
            setPasswordErrorMessage('Campo obligatorio para la contraseña');
            setTimeout(() => {
                setEmailErrorMessage('');
                setPasswordErrorMessage('');
            }, 3000);
        }
    }


    const openForgotPasswordModal = () => {
        setForgotPasswordModalVisible(true);
    };

    const closeForgotPasswordModal = () => {
        setForgotPasswordModalVisible(false);
    };


    const handleSendEmail = () => {
        setIsEmailSent(true);

        // Muestra la alerta de correo enviado
        Alert.alert(
            'Correo Enviado',
            'Revisa tu bandeja para restablecer la contraseña.',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );

    };





    return (
        <>

            <View style={styles.container}>

                <Text style={styles.textBienvenido}>
                    ¡Bienvenid@!
                </Text>
                <Input
                    placeholder="Correo electrónico"
                    keyboardType="email-address"
                    value={email}
                    onChange={({ nativeEvent: { text } }) => setEmail(text)}
                    labelStyle={styles.label}
                    containerStyle={styles.input}
                    errorMessage={emailErrorMessage}
                    inputContainerStyle={styles.inputStyle}
                    rightIcon={
                        <Icon
                            type="material-community"
                            name="email-outline"
                            color='#A2160F' />
                    } />
                <Input
                    placeholder="Contraseña"
                    value={password}
                    onChange={({ nativeEvent: { text } }) => setPassword(text)}
                    labelStyle={styles.label}
                    containerStyle={styles.input}
                    secureTextEntry={showPassword}
                    inputContainerStyle={styles.inputStyle}
                    rightIcon={
                        <Icon
                            type="material-community"
                            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                            color='#A2160F'
                            onPress={() => setShowPassword(!showPassword)} />
                    }
                    errorMessage={passwordErrorMessage} />
                <Button title='¿Olvidaste la Contraseña?' onPress={openForgotPasswordModal} type='clear' style={styles.textForgotPassword} />

                <Button
                    title='Iniciar sesión'
                    onPress={login}
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btnStyle}
                    titleStyle={{ color: 'white' }} />

                {/* Overlay con diseño personalizado */}
                <Overlay isVisible={isOverlayVisible} onBackdropPress={() => setOverlayVisible(false)}>
                    <View style={styles.overlayContainer2}>
                        <Icon type="material-community" name="check-circle" size={50} color="green" />
                        <Text style={styles.overlayText}>Inicio de sesión exitoso</Text>
                    </View>
                </Overlay>

                <Overlay isVisible={isForgotPasswordModalVisible} onBackdropPress={closeForgotPasswordModal}>
                    <View style={styles.overlayContainer}>
                        {isEmailSent ? (
                            <>
                                <Icon type="material-community" name="email-check-outline" size={50} color="green" />
                                <Text style={styles.overlayText}>Se ha enviado un correo a {forgotEmail} para restablecer la contraseña.</Text>
                                <View>
                                    <Button title='Cerrar' onPress={closeForgotPasswordModal}
                                        type='solid'
                                        containerStyle={styles.btnContainer}
                                        buttonStyle={styles.btnStyle3}
                                        titleStyle={{ color: 'white' }} />

                                    <Button title='Volver a intentar' onPress={() => setIsEmailSent(false)}
                                        type='solid'
                                        containerStyle={styles.btnContainer}
                                        buttonStyle={styles.btnStyle3}
                                        titleStyle={{ color: 'white' }} />
                                </View>
                            </>
                        ) : (
                            <>
                                <Text style={styles.overlayText}>Por favor, introduce tu dirección de correo electrónico para restablecer tu contraseña.</Text>
                                <Input
                                    placeholder="Correo electrónico"
                                    keyboardType="email-address"
                                    value={forgotEmail}
                                    onChangeText={(text) => setForgotEmail(text)}
                                    containerStyle={styles.input}
                                    inputContainerStyle={styles.inputStyle}
                                />
                                <View >
                                    <Button title='Enviar correo' onPress={handleSendEmail}
                                        type='solid'
                                        containerStyle={styles.btnContainer}
                                        buttonStyle={styles.btnStyle3}
                                        titleStyle={{ color: 'white' }}
                                    />
                                    <Button title='Volver a intentar' onPress={() => setIsEmailSent(false)}
                                        type='solid'
                                        containerStyle={styles.btnContainer}
                                        buttonStyle={styles.btnStyle3}
                                        titleStyle={{ color: 'white' }}
                                    />
                                </View>
                            </>
                        )}
                    </View>
                </Overlay>

            </View>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    input: {

        paddingHorizontal: 16,
        marginVertical: 20,
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
        borderBottomColor: 'white', // Establece el color del borde inferior igual al color de fondo para ocultar la línea en iOS



    },
    inputStyle: {
        borderBottomWidth: 0
    },
    overlayContainer2: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 40,
        height: 130,

    },

    label: {
        color: '#A2160F',
        marginTop: 20,

    },
    btnStyle: {
        backgroundColor: '#A2160F',
        borderRadius: 30,
    },
    //este es el estilo del boton de registrarse 
    btnStylee: {
        backgroundColor: '#A2160F',
        borderRadius: 30,
    },
    // Modifica el margen vertical del contenedor de los botones por si hay mas de uno les da espacio 
    btnContainer: {
        width: '80%',
        marginTop: 10, // Puedes ajustar este valor según tus preferencias
        marginBottom: 10,
    },
    overlayContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 40,
        height: 330,

    },

    overlayText: {
        fontSize: 18,
        marginTop: 10,
        textAlign: 'center',
        marginBottom: 20,


    },
    textBienvenido: {
        fontSize: 30,
        color: '#A2160F',
    },
    textForgotPassword: {
        color: 'red',
        textAlign: 'right',
        marginTop: 10,


    },
    btnStyle3: {
        backgroundColor: '#A2160F',
        borderRadius: 30,
        width: 300,

    },
})

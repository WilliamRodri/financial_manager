import * as React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginService from '../services/Login.service';

function LoginPage({ navigation }: any) {

    const [ username, setUsername ] = React.useState('');
    const [ password, setPassword ] = React.useState('');
    
    const handleChangeUsername = (text: string) => {
        setUsername(text);
    };

    const handleChangePassword = (text: string) => {
        setPassword(text)
    }

    const submitData = () => {
        const resultData = LoginService(username, password);
        if(resultData) {
            navigation.navigate('FinancialReport');
        }else{
            console.log('Usuario ou senha invalidos');
        }
    }

    return(
        <KeyboardAwareScrollView>
            <SafeAreaView style={styles.container}>
                <Image
                    source={require('../assets/logo/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <Text style={styles.titlePageLogin}>Realize seu Login</Text>

                <TextInput
                    style={styles.inputRegister}
                    placeholder='Digite seu username'
                    placeholderTextColor='#C3C3C3'
                    onChangeText={handleChangeUsername}
                    value={username}
                />

                <TextInput
                    style={styles.inputRegister}
                    placeholder='Digite sua senha'
                    placeholderTextColor='#C3C3C3'
                    onChangeText={handleChangePassword}
                    value={password}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={submitData}
                >
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.buttonTextUnique}>Cadastrar-se</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        width: 300,
        height: 100,
        marginBottom: 30,
        marginTop: 140
    },
    titlePageLogin: {
        color: '#090937',
        fontSize: 30,
        marginBottom: 25,
    },
    inputRegister: {
        width: 268,
        height: 46,
        borderColor: '#090937',
        borderRadius: 15,
        borderWidth: 1.5,
        paddingLeft: 15,
        fontSize: 15,
        margin: 15,
        color: '#090937',
    },
    button: {
        width: 268,
        height: 46,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
        backgroundColor: '#090937',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    buttonTextUnique: {
        fontSize: 14,
        color: '#232265',
        opacity: 50,
    }
})
export default LoginPage;
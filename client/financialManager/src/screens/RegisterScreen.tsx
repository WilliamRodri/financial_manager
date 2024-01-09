import * as React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/auth';
import AlertModal from '../components/Alert.modal';

function RegisterPage({ navigation }: any) {

    const [ username, setUsername ] = React.useState('');
    const [ email, setEmail ] = React.useState('');
    const [ password, setPassword ] = React.useState('');
    const [ buttonLoading, setButtonLoading ] = React.useState(false);

    const { register } = useAuth();
    const [ registerState, setRegisterState ] = React.useState(register);

    React.useEffect(() => {
        if (register) {
            setRegisterState(true);
        }
    }, [register]);

    function modalActive () {
        return <AlertModal
            statusModal={registerState}
            modalTextAlert='Sua conta foi criada com Sucesso!'
            textButtonOne='Prosseguir'
            textButtonTwo='Fechar'
            clickButtonOne={() => navigation.navigate('Login')}
            clickButtonTwo={false}
        />;
    }

    const { registerInFinancial } = useAuth();

    const processRegister = async () => {
        setButtonLoading(true);
        await registerInFinancial(username, email,password)
        setButtonLoading(false);
    }
    
    const handleChangeUsername = (text: string) => {
        setUsername(text);
    };

    const handleChangeEmail = (text: string) => {
        setEmail(text);
    }

    const handleChangePassword = (text: string) => {
        setPassword(text);
    }
    
    return(
        <KeyboardAwareScrollView>
            <SafeAreaView style={styles.container}>
                <Image
                    source={require('../assets/logo/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <Text style={styles.titlePageLogin}>Realize seu Registro</Text>

                <TextInput
                    style={styles.inputRegister}
                    placeholder='Digite seu username'
                    placeholderTextColor='#C3C3C3'
                    onChangeText={handleChangeUsername}
                    value={username}
                />

                <TextInput
                    style={styles.inputRegister}
                    placeholder='Digite seu email'
                    placeholderTextColor='#C3C3C3'
                    onChangeText={handleChangeEmail}
                    value={email}
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
                    onPress={() => processRegister()}
                    disabled={registerState ? true : false}
                >
                    {buttonLoading
                        ?
                        <View style={styles.buttonLoading}>
                            <Text style={styles.buttonText}>Registrando</Text>
                            <ActivityIndicator size="small" color="#FFF" />
                        </View>
                        :
                        <Text style={styles.buttonText}>Registrar</Text>
                    }

                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonTextUnique}>Realizar login</Text>
                </TouchableOpacity>

                { registerState ? modalActive() : null }

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
        marginTop: 90
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
    },
    buttonLoading: {
        flexDirection: 'row',
        gap: 20
    }
})
export default RegisterPage;
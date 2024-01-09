import * as React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/auth';
import AlertModal from '../components/Alert.modal';

function LoginPage({ navigation }: any) {

    const [ username, setUsername ] = React.useState('');
    const [ password, setPassword ] = React.useState('');
    const [ buttonLoading, setButtonLoading ] = React.useState(false);

    const { signIn, login } = useAuth();
    const [ loginState, setLoginState ] = React.useState(false);

    React.useEffect(() => {
        if (!login) {
            setLoginState(true);
        }
    }, [login]);

    function modalActive () {
        return <AlertModal
            statusModal={loginState}
            modalTextAlert='Error no login, tente novamente!'
            textButtonOne='Fechar'
            textButtonTwo=''
            clickButtonOne={() => {
                navigation.navigate('Login');
                setLoginState(false);
            }}
            clickButtonTwo={() => {
                false;
                setLoginState(false);
            }}
        />;
    }

    const handleChangeUsername = (text: string) => {
        setUsername(text);
    };

    const handleChangePassword = (text: string) => {
        setPassword(text)
    }

    const processLogin = async () => {
        setButtonLoading(true);
        await signIn(username, password);
        setButtonLoading(false);
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
                    onPress={() => processLogin()}
                >
                    {buttonLoading 
                        ? 
                        <View style={styles.buttonLoading}>
                            <Text style={styles.buttonText}>Conectando</Text>
                            <ActivityIndicator size="small" color="#FFF" />
                        </View>
                        :
                        <Text style={styles.buttonText}>Entrar</Text>
                    }
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.buttonTextUnique}>Cadastrar-se</Text>
                </TouchableOpacity>

                { loginState ? modalActive() : null }
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
    },
    buttonLoading: {
        flexDirection: 'row',
        gap: 20
    }
})
export default LoginPage;
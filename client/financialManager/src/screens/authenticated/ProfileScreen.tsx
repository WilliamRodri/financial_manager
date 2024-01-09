import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from '../../contexts/auth';

function ProfilePage() {

    const { signOut }: any = useAuth();

    return(
        <SafeAreaView style={style.container}>
            <Text style={style.titlePage}>Pagina de Perfil</Text>
            <TouchableOpacity style={style.buttonLogout} onPress={() => signOut()}>
                <Text style={style.textButtonLogout}>Desconectar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titlePage: {
        color: '#090937',
        fontSize: 30,
        marginTop: 30,
        marginBottom: 50
    },
    buttonLogout: {
        backgroundColor: '#232265',
        width: '50%',
        padding: 10,
        alignItems: 'center',
        borderRadius: 7,
    },
    textButtonLogout: {
        color: 'white'
    }
});

export default ProfilePage;
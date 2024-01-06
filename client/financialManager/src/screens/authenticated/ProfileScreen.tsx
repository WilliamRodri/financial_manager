import * as React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

function ProfilePage() {
    return(
        <SafeAreaView>
            <Text style={{color: 'black'}}>Pagina Perfil</Text>
        </SafeAreaView>
    );
}

export default ProfilePage;
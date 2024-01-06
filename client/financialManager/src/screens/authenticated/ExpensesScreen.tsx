import * as React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

function ExpensesPage() {
    return(
        <SafeAreaView>
            <Text style={{color: 'black'}}>Pagina detalhada das Despesas</Text>
        </SafeAreaView>
    );
}

export default ExpensesPage;
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInputMask } from "react-native-masked-text";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/auth";
import { useState } from "react";
import { incomesService } from "../../services/Incomes.service";

const IncomesPageCreated = ({ navigation }: any) => {
    const { authData } = useAuth();

    const [income, setIncome] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [ buttonLoading, setButtonLoading ] = useState(false);

    const saveIncome = async () => {
        setButtonLoading(true);
        const incomeServiceCreate = await incomesService.createIncome({
            income, amount, date
        }, authData?.accessToken);
        if (incomeServiceCreate) {
            setButtonLoading(false);
            navigation.navigate('IncomesPage');
        }
    }
    
    return (
        <KeyboardAwareScrollView>
            <SafeAreaView style={styles.container}>
                <Text style={styles.textPageInformaction}>Informe sua renda, a data e o valor.</Text>

                <TextInput
                    style={styles.input}
                    placeholder='Descreva sua renda'
                    placeholderTextColor='#C3C3C3'
                    value={income}
                    onChangeText={ text => setIncome(text) }
                />
                <TextInputMask
                    style={styles.input}
                    placeholder='Digite o valor'
                    placeholderTextColor='#C3C3C3'
                    type="money"
                    value={amount}
                    onChangeText={ amount => setAmount(amount) }
                />
                <TextInputMask
                    style={styles.input}
                    placeholder="Digite a data: DD/MM/YYYY"
                    placeholderTextColor='#C3C3C3'
                    keyboardType="numeric"
                    type="datetime"
                    options={{
                        maskType: "BRL",
                        dddMask: '(99) ',
                        withDDD: true,
                        format: "DD/MM/YYYY",
                    }}
                    value={date}
                    onChangeText={ date => setDate(date) }
                />

                {
                    buttonLoading 
                    ? 
                        <View style={styles.buttonLoading}>
                            <Text style={styles.buttonText}>Registrando</Text>
                            <ActivityIndicator size="small" color="#FFF" />
                        </View>
                    :
                    <TouchableOpacity style={styles.button} onPress={() => saveIncome()}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                }
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 12,
        marginTop: 20,
    },
    textPageInformaction: {
        color: '#090937',
        fontSize: 22,
        textAlign: 'center',
        marginTop: 60,
        marginBottom: 30,
    },
    input: {
        borderColor: '#090937',
        borderRadius: 15,
        borderWidth: 1.5,
        paddingLeft: 15,
        fontSize: 15,
        marginTop: 10,
        marginBottom: 15,
        color: '#090937',
    },
    button: {
        height: 46,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        backgroundColor: '#090937',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    buttonLoading: {
        height: 46,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        backgroundColor: '#090937',
        flexDirection: 'row',
        gap: 20
    },
});


export default IncomesPageCreated;
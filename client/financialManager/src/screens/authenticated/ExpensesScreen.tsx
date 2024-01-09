import * as React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../contexts/auth';
import { expenseService } from '../../services/expense.service';
import AlertModal from '../../components/Alert.modal';
import SkeletonExpense from '../../components/Skeletons/ExpenseScreen.skeleton';

interface alertModal {
    text: string;
    textButtonOne: string;
    textButtonTwo: string;
    action: () => void;
}

function ExpensesPage({ navigation }: any) {
    const [ loadingPage, setLoadingPage ] = React.useState(true);
    const { authData }: any = useAuth();

    const [dataExpenses, setDataExpenses]: any = React.useState([]);
    const [deleteExpenseState, setDeleteExpenseState]: any = React.useState(false);
    const [selectedExpenseId, setSelectedExpenseId]: any = React.useState('');

    const fetchData = async () => {
        const expenses = await expenseService.getExpense(authData?.accessToken || '');
        try {
            setDataExpenses(expenses);
            setLoadingPage(false);
        } catch (error) {
            console.error(error);
        }
    }
    
    React.useEffect(() => {
        const intervalRequest = setInterval(fetchData, 1000);
        return () => clearInterval(intervalRequest);
    }, []);

    React.useEffect(() => {
        fetchData();
    }, [authData]);

    function alertModal(req: alertModal) {
        return <AlertModal
            statusModal={deleteExpenseState}
            modalTextAlert={req.text}
            textButtonOne={req.textButtonOne}
            textButtonTwo={req.textButtonTwo}
            clickButtonOne={req.action}
            clickButtonTwo={closeModal}
        />
    }

    const handleDelete = async (idExpense: string) => {
        setSelectedExpenseId(idExpense);
        setDeleteExpenseState(true);
    }

    const closeModal = () => {
        setDeleteExpenseState(false);
        setSelectedExpenseId('');
    }

    const deleteExpense = async () => {
        closeModal();
        const expense = await expenseService.deleteExpense(authData, selectedExpenseId);
    }

    const req = {
        text: 'Deseja realmente deletar essa despesa?',
        textButtonOne: 'Apagar',
        textButtonTwo: 'Cancelar',
        action: deleteExpense,
    }

    return(
        <SafeAreaView style={styles.container}>
            <SkeletonExpense visible={loadingPage}>
                <ScrollView>
                    <Text style={styles.titlePage}>Despesas</Text>

                    <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("CreateExpense")}
                    >
                        <Text style={styles.buttonText}>Adicionar despesa</Text>
                        <Icon name='pen-plus' color='white' size={20} />
                    </TouchableOpacity>
                    </View>

                    <View style={styles.boxsInformacoesSecundaria}>
                        {dataExpenses.length > 0 ? (
                            dataExpenses.map((expense: any) => (
                                <View style={styles.cardInformacaoExpense} key={expense.id}>
                                    <Text style={styles.descriptionExpenseCard}>{expense.description}</Text>

                                    <View style={styles.finallyObjectsCard}>
                                        <Text style={styles.amountExpenseCard}>{`R$ ${expense.amount}`}</Text>
                                        <TouchableOpacity
                                            style={styles.iconTrash}
                                            onPress={() => handleDelete(expense.id)}
                                        >
                                            <Icon2 name='trash' color='white' size={20} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.textAviso}>Nenhuma despesa cadastrada.</Text>
                        )}
                        {deleteExpenseState && alertModal(req)}
                    </View>
                </ScrollView>
            </SkeletonExpense>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 12,
        marginTop: 20,
    },
    titlePage: {
        color: '#090937',
        fontSize: 30,
        marginBottom: 28,
        marginLeft: 11.5
    },
    boxsInformacoesSecundaria: {
        marginTop: 5,
    },
    cardInformacaoExpense: {
        marginLeft: 11.5,
        marginRight: 11.5,
        backgroundColor: '#232265',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
    },
    finallyObjectsCard: {
        flexDirection: 'row',
        marginLeft: 5,
    },
    iconTrash: {
        marginLeft: 40
    },
    descriptionExpenseCard: {
        color: 'white',
        fontSize: 20
    },
    amountExpenseCard: {
        color: 'white',
        fontSize: 15
    },
    button: {
        height: 46,
        borderRadius: 10,
        margin: 11.5,
        marginBottom: 35,
        backgroundColor: '#090937',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 12,
        flex: 1,
        flexDirection: 'row',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    textAviso: {
        color: '#090937',
        marginLeft: 11.5,
        fontSize: 20,
    },
});

export default ExpensesPage;
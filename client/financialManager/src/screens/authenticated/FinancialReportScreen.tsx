import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { financesService } from '../../services/finances.service';
import { useAuth } from '../../contexts/auth';
import { expenseService } from '../../services/expense.service';
import SkeletonFinancial from '../../components/Skeletons/FinancialScreen.skeleton';


function FinancialReportPage() {

    const [ loadingPage, setLoadingPage ] = React.useState(true);

    const { authData } = useAuth();
    const [dataFinances, setDataFinances]: any = React.useState({
        netBalance: 0,
        totalExpenses: 0,
        totalIncome: 0,
        balanceSave: 0,
      });
      
    const [dataExpenses, setDataExpenses]: any = React.useState([]);

    const fetchData = async () => {
        try {
          const finances = await financesService.getFinances(authData?.accessToken || '');
          setDataFinances(finances);
          const expenses = await expenseService.getExpense(authData?.accessToken || '');
          setDataExpenses(expenses);
          setLoadingPage(false);
        } catch (error) {
          console.error(error);
        }
    };
      
    React.useEffect(() => {
        const intervalRequest = setInterval(fetchData, 1000);
        return () => clearInterval(intervalRequest);
    });
    
    React.useEffect(() => {
        fetchData();
    }, [authData]);

    return (
        <SafeAreaView style={styles.container}>
            <SkeletonFinancial visible={loadingPage}>
                <ScrollView>
                    <Text style={styles.titlePage}>
                        Relatório Financeiro
                    </Text>

                    <View style={styles.boxsInformacoesPrimaria}>
                        <View style={styles.viewBox}>
                            <View style={[styles.boxContainer, styles.boxOne]}>
                                <Text style={styles.titleBoxContainer}>Saldo Líquido</Text>
                                <Text style={styles.informacaoBoxContainer}>R$ {dataFinances.netBalance}</Text>
                            </View>
                            <View style={[styles.boxContainer, styles.boxTwo]}>
                                <Text style={styles.titleBoxContainer}>Despesas</Text>
                                <Text style={styles.informacaoBoxContainer}>R$ {dataFinances.totalExpenses}</Text>
                            </View>
                        </View>

                        <View style={styles.viewBox}>
                            <View style={[styles.boxContainer, styles.boxTwo]}>
                                <Text style={styles.titleBoxContainer}>Total de Renda</Text>
                                <Text style={styles.informacaoBoxContainer}>R$ {dataFinances.totalIncome}</Text>
                            </View>
                            <View style={[styles.boxContainer, styles.boxTwo]}>
                                <Text style={styles.titleBoxContainer}>Saldo para Poupança</Text>
                                <Text style={styles.informacaoBoxContainer}>R$ {dataFinances.balanceSave}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.boxsInformacoesSecundaria}>
                        <Text style={styles.titlePage}>Despesas</Text>
                        {dataExpenses.length > 0 ? (
                            dataExpenses.map((expense: any) => (
                                <View style={styles.cardInformacaoExpense} key={expense.id}>
                                    <Text style={styles.descriptionExpenseCard}>{expense.description}</Text>
                                    <Text style={styles.amountExpenseCard}>{`R$ ${expense.amount}`}</Text>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.textAviso}>Nenhuma despesa cadastrada.</Text>
                        )}
                    </View>
                </ScrollView>
            </SkeletonFinancial>
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
    boxsInformacoesPrimaria: {
        marginBottom: 5,
    },
    boxsInformacoesSecundaria: {
        marginTop: 5,
    },
    viewBox: {
        flexDirection: 'row',
    },
    boxContainer: {
        flex: 1,
        justifyContent: 'center',
        borderWidth: 0,
        width: 181,
        height: 104,
        borderRadius: 24,
        padding: 5,
        backgroundColor: 'pink',
        marginLeft: 11.5,
        marginRight: 11.5,
        marginTop: 8.5,
        marginBottom: 8.5
    },
    boxOne: {
        backgroundColor: '#090937',
        paddingLeft: 16,
    },
    boxTwo: {
        backgroundColor: '#232265',
        paddingLeft: 16,
    },
    titleBoxContainer: {
        color: '#C3C3C3',
        fontSize: 11,
        marginBottom: 3,
    },
    informacaoBoxContainer: {
        color: 'white',
        fontSize: 24,
        marginTop: 3,
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
    descriptionExpenseCard: {
        color: 'white',
        fontSize: 20
    },
    amountExpenseCard: {
        color: 'white',
        fontSize: 15
    },
    textAviso: {
        color: '#090937',
        marginLeft: 11.5,
        fontSize: 20,
    },
});

export default FinancialReportPage;

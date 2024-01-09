import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AuthorizedRouter } from "./Authorized.route";
import ExpensePageCreated from "../screens/authenticated/ExpensesScreenCreated";
import IncomesPageCreated from "../screens/authenticated/IncomesScreenCreated";

export const StackNavigation = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="home" component={AuthorizedRouter}/>
            <Stack.Screen 
                name="CreateExpense"
                component={ExpensePageCreated}
                options={{
                    headerTitle: 'Cadastre sua despesa',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: 22,
                    },
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTransparent: true,
                }}
            />
            <Stack.Screen 
                name="CreateIncome"
                component={IncomesPageCreated}
                options={{
                    headerTitle: 'Cadastre sua renda',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: 22,
                    },
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTransparent: true,
                }}
            />
        </Stack.Navigator>
    );
}
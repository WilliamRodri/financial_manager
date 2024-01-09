import ProfilePage from "../screens/authenticated/ProfileScreen";
import IncomesPage from "../screens/authenticated/IncomesScreen";
import ExpensesPage from "../screens/authenticated/ExpensesScreen";
import FinancialReportPage from "../screens/authenticated/FinancialReportScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Feather";
import Icon2 from "react-native-vector-icons/FontAwesome5";

const Tab = createBottomTabNavigator();

export function AuthorizedRouter({ navigation }: any) {
    var activeTintColor = 'white';
    var inactiveTintColor = '#C3C3C3';

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#090937',
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderWidth: 0,
                },
            }}
        >
            <Tab.Screen
                name="FinancialReport"
                component={FinancialReportPage}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Início',
                    tabBarActiveTintColor: activeTintColor,
                    tabBarInactiveTintColor: inactiveTintColor,
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" size={22} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="ExpensesPage"
                component={ExpensesPage}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Despesas',
                    tabBarActiveTintColor: activeTintColor,
                    tabBarInactiveTintColor: inactiveTintColor,
                    tabBarIcon: ({ color }) => (
                    <Icon name="shopping-cart" size={22} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="IncomesPage"
                component={IncomesPage}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Rendas',
                    tabBarActiveTintColor: activeTintColor,
                    tabBarInactiveTintColor: inactiveTintColor,
                    tabBarIcon: ({ color }) => (
                        <Icon2 name="money-bill-wave-alt" size={22} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="ProfilePage"
                component={ProfilePage}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Perfil',
                    tabBarActiveTintColor: activeTintColor,
                    tabBarInactiveTintColor: inactiveTintColor,
                    tabBarIcon: ({ color }) => (
                        <Icon name="user" size={22} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
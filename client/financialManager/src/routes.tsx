import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './screens/HomeScreen';
import LoginPage from './screens/LoginScreen';
import RegisterPage from './screens/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';
import FinancialReportPage from './screens/authenticated/FinancialReportScreen';

const Stack = createNativeStackNavigator();


export const Routes = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                name="Home"
                component={HomePage}
                options={{ headerShown: false }}
                />
                <Stack.Screen
                name="Login"
                component={LoginPage}
                options={{ headerShown: false }}
                />
                <Stack.Screen
                name="Register"
                component={RegisterPage}
                options={{ headerShown: false }}
                />
                <Stack.Screen
                name="FinancialReport"
                component={FinancialReportPage}
                options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;
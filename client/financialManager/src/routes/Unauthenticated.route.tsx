import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../screens/HomeScreen";
import LoginPage from "../screens/LoginScreen";
import RegisterPage from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator();

export function UnauthenticatedRoute() {
    return (
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
        </Stack.Navigator>
    );
}
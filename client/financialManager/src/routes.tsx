import React from "react";
import { useAuth } from "./contexts/auth";
import { NavigationContainer } from "@react-navigation/native";
import { UnauthenticatedRoute } from "./routes/Unauthenticated.route";
import { StackNavigation } from "./routes/StackNavigation.route";
import LoadingScreen from "./components/loadingScren";


export function Routers() {
    const { authData, isLoading } = useAuth();
    if (isLoading) {
        return (
            <LoadingScreen />
        );
    } {
        return (
            <NavigationContainer>
                {authData ? <StackNavigation /> : <UnauthenticatedRoute />}
            </NavigationContainer>
        );
    }
}
import React, {createContext, useContext, useEffect, useState} from 'react';
import { Alert } from "react-native";
import { loginService } from "../services/Login.service";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerService } from '../services/Register.service';

export interface AuthData {
    accessToken: string;
    userId: string;
};

interface AuthContextData {
    authData?: AuthData;
    login?: boolean;
    register?: Boolean;
    isLoading: boolean;
    signIn: (username: string, password: string) => Promise<void>;
    registerInFinancial: (username: string, email: string, password: string) => Promise<void>;
    signOut: () => void;
};

interface Props {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [ authData, setAuthData ] = useState<AuthData>();
    const [ login, setLogin ] = useState(true);
    const [ register, setRegister ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
      loadStorageData();
    }, []);
  
    async function loadStorageData(): Promise<void> {
      try {
        const authDataSerialized = await AsyncStorage.getItem('@AuthData');
        if (authDataSerialized) {
          const _AuthData: AuthData = JSON.parse(authDataSerialized);
          setAuthData(_AuthData);
        }
        
      } catch (error) {}finally {
        setIsLoading(false);
      }
    }

    async function signIn(username: string, password: string) {
      try {
        const authData = await loginService.signIn(username, password);
        setAuthData(authData);
        setLogin(true);
        AsyncStorage.setItem('@AuthData', JSON.stringify(authData));
      } catch (error) {
        setLogin(false);
        setTimeout(() => {
          setLogin(true);
        }, 1000);
      }
    }
    
    async function registerInFinancial(username: string, email: string, password: string) {
      const authData = await registerService.registerInFinancial(username, email, password);
      setRegister(true);
    }
    
    function signOut() {
      setAuthData(undefined);
      AsyncStorage.removeItem('@AuthData');
    }
    

    return (
      <AuthContext.Provider value={{ authData, signIn, signOut, registerInFinancial, register, isLoading, login }}>
        {children}
      </AuthContext.Provider>
    );
};

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
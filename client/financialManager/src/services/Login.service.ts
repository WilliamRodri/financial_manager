import config from "../../config";
import { AuthData } from "../contexts/auth";

const signIn = async (username: string, password: string): Promise<AuthData> => {

    const response = await fetch(config.BASE_URL_API + '/auth/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ username, password })
    });
    const responseData = await response.json();

    return new Promise((resolver, reject) => {
        if ('message' in responseData) {
            reject(new Error('Usuario e/ou senha são inválidos'));

        }else if ('access_token' in responseData && 'user_id' in responseData) {
            const accessToken = responseData.access_token;
            const userId = responseData.user_id;

            resolver({
                accessToken: accessToken,
                userId: userId
            });

        }else {
            reject(new Error('Error no servidor, Contate Suporte!'));
        }
    });
}



export const loginService = {signIn};

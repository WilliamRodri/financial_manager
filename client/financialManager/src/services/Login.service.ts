const LoginService = (username: string, password: string) => {
    const dados = [{
        username: 'teste',
        password: '123'
    }];

    for (const data of dados) {
        if(data.username === username && data.password === password){
            return true;
        }
        return false;
    }
}

export default LoginService;
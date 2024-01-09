const registerInFinancial = async (username: string, email: string, password: string) => {
    const response = await fetch('https://app-api-financialmanager-fc63080ef59d.herokuapp.com/users/create', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ username, email, password })
    });

    const responseData = await response.json();

    return new Promise((resolver, reject) => {
        if (Array.isArray(responseData) && responseData.length > 0 && 'message' in responseData[0]) {
            resolver({
                message: responseData[0].message
            });
        } else if ('statusCode' in responseData && responseData.statusCode === 400 && 'message' in responseData) {
            reject(new Error(responseData.message));
        } else {
            reject(new Error('Resposta inesperada'));
        }
    }) ;
}

export const registerService = { registerInFinancial };

import config from "../../config";

const formatNumber = (value: number) => {
    return value.toFixed(2).replace('.', ',');
};

const getFinances = async (accessToken: string) => {
    const response = await fetch(config.BASE_URL_API + '/finances/', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    });

    const data = await response.json();
    return new Promise((resolve, reject) => {
        if (response.status == 401) {
            reject(new Error('Error no servidor, Contate Suporte!'));
        } else {
            const sanitizedFinances = {
                totalIncome: formatNumber(Math.max(0, data.totalIncome)),
                totalExpenses: formatNumber(Math.max(0, data.totalExpenses)),
                netBalance: formatNumber(Math.max(0, data.netBalance)),
                balanceSave: formatNumber(Math.max(0, data.balanceSave)),
            };
            resolve(sanitizedFinances);
        }
    });
}

export const financesService = { getFinances };
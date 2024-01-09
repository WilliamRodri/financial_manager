import config from "../../config";

interface dataExpense {
    accessToken?: string,
    userId?: string,
}

interface dataCreateExpense {
    income: string;
    amount: string;
    date: string;
}

const getIncomes = async (accessToken: string) => {
    const response = await fetch(config.BASE_URL_API + '/income/', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    });

    const dataIncomes = await response.json();
    return new Promise((resolve, reject) => {
        if (response.status == 401) {
            reject(new Error('Error no servidor, Contate Suporte!'));
        } else if (dataIncomes.length === 0) {
            resolve({
                message: 'Nenhuma renda cadastrada.'
            });
        } else {
            if (Array.isArray(dataIncomes)) {
                const incomes = dataIncomes.map((data: any) => ({
                    id: data.id,
                    userId: data.userId,
                    description: data.description,
                    amount: data.amount,
                    date: data.date,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                }));
                resolve(incomes);
            } else {
                resolve([]);
            }
        }
    });
}

const createIncome = async (data: dataCreateExpense, accessToken: any) => {
    const [day, month, year] = data.date.split('/');
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    const formattedAmount = parseFloat(data.amount.replace('R$', '').replace(',', '.'));
    const expense = data.income;

    const response = await fetch(config.BASE_URL_API + '/income/register-income', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            description: expense,
            amount: formattedAmount,
            date: formattedDate,
        })
    });
    const responseCreated = await response.json();
    return new Promise((resolve, reject) => {
        if (response.status == 201) {
            resolve({
                message: 'Renda salva com sucesso!'
            });
        } else {
            reject(new Error('Error no servidor, Contate Suporte!'));
        }
    });
}

const deleteIncome = async (data: dataExpense, idProduct: string) => {
    const response = await fetch(config.BASE_URL_API + '/income/delete-income/' + idProduct, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${data.accessToken}`
        },
    });
    const responseDelete = await response.json();
    return new Promise((resolve, reject) => {
        if (response.status == 200) {
            resolve(responseDelete);
        } else {
            reject(new Error('Error no servidor, Contate Suporte!'));
        }
    });
}

export const incomesService = { getIncomes, createIncome, deleteIncome };
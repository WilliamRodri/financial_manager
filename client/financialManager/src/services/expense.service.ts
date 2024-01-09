import config from "../../config";

interface dataExpense {
    accessToken?: string,
    userId?: string,
}

interface dataCreateExpense {
    expense: string;
    amount: string;
    date: string;
    checkBox: boolean;
}

const getExpense = async (accessToken: string) => {
    const response = await fetch(config.BASE_URL_API + '/expense/', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    });

    const dataExpense = await response.json();

    return new Promise((resolve, reject) => {
        if (response.status == 401) {
            reject(new Error('Error no servidor, Contate Suporte!'));
        } else if (dataExpense.length === 0) {
            resolve({
                message: 'Nenhuma despesa cadastrada.'
            });
        } else {
            if (Array.isArray(dataExpense)) {
                const expenses = dataExpense.map((data: any) => ({
                    id: data.id,
                    userId: data.userId,
                    description: data.description,
                    amount: data.amount,
                    date: data.date,
                    isPaid: data.isPaid,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                }));
                resolve(expenses);
            } else {
                resolve([]);
            }
        }
    });
}

const deleteExpense = async (data: dataExpense, idProduct: string) => {
    const response = await fetch(config.BASE_URL_API + '/expense/delete-income/' + idProduct, {
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

const createExpense = async (data: dataCreateExpense, accessToken: any) => {
    const [day, month, year] = data.date.split('/');
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    const formattedAmount = parseFloat(data.amount.replace('R$', '').replace(',', '.'));
    const expense = data.expense;
    const checkBox = data.checkBox;

    const response = await fetch(config.BASE_URL_API + '/expense/register-income', {
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
            isPaid: checkBox
        })
    });
    const responseCreated = await response.json();
    return new Promise((resolve, reject) => {
        if (response.status == 201) {
            resolve({
                message: 'Despesa salva com sucesso!'
            });
        } else {
            reject(new Error('Error no servidor, Contate Suporte!'));
        }
    });
}

export const expenseService = { getExpense, deleteExpense, createExpense };

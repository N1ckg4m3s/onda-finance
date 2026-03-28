import { api } from "../../../lib/axios"
import type { createTransactionsParams } from "../types/types";

export const createTransaction = async (params: createTransactionsParams) => {
    const { amount, destination, from } = params


    const response = await api.post('/transaction', {
        amount,
        destination,
        from,
    });

    return response.data;
};

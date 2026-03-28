import { api } from "../../../lib/axios"
import type { AuthSession } from "../../auth/types/types";

type getTransactionsParams = {
    session?: AuthSession | null,
    page?: number,
    limit?: number
}

export const getTransactions = async (params: getTransactionsParams = {}) => {
    const {
        page = 1,
        limit = 20,
        session
    } = params

    const response = await api.get('/transaction', {
        params: {
            page,
            limit,
            agency: session?.account.agency,
            account: session?.account.account
        }
    });

    return response.data;
};

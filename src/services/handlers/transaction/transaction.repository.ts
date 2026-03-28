import type { AccountResume } from "../../../features/auth/types/types";
import { FAKE_DB } from "../../../infra/db/FAKE_DB";

export const transactionRepository = {
    getTransactions: async ({ page, limit, accountKey }: { page: number, limit: number, accountKey: string }) => {

        const userTransactions = FAKE_DB.transactions[accountKey]

        const ordened = [...userTransactions].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

        const start = (page - 1) * limit;
        const end = start + limit;

        return {
            data: ordened.slice(start, end),
            total: userTransactions.length,
            page,
            limit
        }
    },

    newTransactions: async (accountKey: string, params: { destination: AccountResume, amount: number, type: 'in' | 'out' }) => {
        const { destination, amount, type } = params

        const newTransaction = {
            amount,
            created_at: new Date(Date.now()).toISOString(),
            destination: {
                account: destination.account,
                agency: destination.agency,
                ownerName: destination.owderName
            },
            id: crypto.randomUUID(),
            type
        }

        FAKE_DB.transactions[accountKey].push(newTransaction)

        return newTransaction
    }
}
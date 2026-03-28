import type { Transaction } from "../../../features/transaction/types/types";

type AccountKey = string; // "000000-0000"

const FAKE_DB: Record<AccountKey, Transaction[]> = {
    "101010-0001": [
        {
            amount: 10,
            created_at: new Date().toISOString(),
            destination: {
                account: '121212',
                agency: '0001',
                ownerName: 'sem nome'
            },
            id: 'mock id',
            type: 'out'
        },
        {
            amount: 25,
            created_at: new Date().toISOString(),
            destination: {
                account: '121212',
                agency: '0001',
                ownerName: 'sem nome'
            },
            id: 'mock id 2',
            type: 'in'
        },
    ]
};

export const transactionRepository = {
    getTransactions: async ({ page, limit, accountKey }: { page: number, limit: number, accountKey: string }) => {

        const userTransactions = FAKE_DB[accountKey]

        const start = (page - 1) * limit;
        const end = start + limit;

        return {
            data: userTransactions.slice(start, end),
            total: userTransactions.length,
            page,
            limit
        }
    },

    newTransactions: async () => {

    }
}
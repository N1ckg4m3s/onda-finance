import type { Account } from "../../../features/auth/types/types";

const FAKE_USER_DB: Record<string, Account> = {
    "101010-0001": {
        owderName: 'Mock user 2',
        account: '101010',
        agency: '0001',
        balance: 500,
    },
    "202020-0001": {
        owderName: 'Mock user 1',
        account: '202020',
        agency: '0001',
        balance: 500,
    }
}

// server-only
export const accountRepository = {
    getUserBalance: async (accountKey: string) => {
        const userAccount = FAKE_USER_DB[accountKey]
        if (!userAccount) throw new Error('No Account registed');

        return userAccount.balance
    },

    applyAmountToAccount: async (accountKey: string, amount: number) => {
        const userAccount = FAKE_USER_DB[accountKey]
        if (!userAccount) throw new Error('No Account registed');

        userAccount.balance += amount

        return userAccount.balance
    },

    isValidAccount: async (accountKey: string) => {
        const userAccount = FAKE_USER_DB[accountKey]
        if (!userAccount) throw new Error('No Account registed');

        return userAccount
    },
}
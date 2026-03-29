import type { Account } from "../../features/auth/types/types";
import type { Transaction } from "../../features/transaction/types/types";

interface DB_Schema {
    accounts: Record<string, Account>,
    transactions: Record<string, Transaction[]>,
}

export const FAKE_DB: DB_Schema = {
    accounts: {
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
        },

        // BOT ACCOUNT
        "999999-9999": {
            owderName: 'bot',
            account: '999999',
            agency: '9999',
            balance: 1000,
        }
    },
    transactions: {
        "101010-0001": [],
        "202020-0001": [],
    }
};

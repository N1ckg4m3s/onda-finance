export interface Transaction {
    id: string

    created_at: string,

    type: 'in' | 'out',

    amount: number,

    destination: {
        agency: string,
        account: string,
        ownerName: string,
    },
}

export type createTransactionsParams = Pick<Transaction, 'amount'> & {
    destination: {
        agency: string,
        account: string,
    }
    from: {
        agency: string,
        account: string,
    }
}

export type createTransactionsForm = Pick<Transaction, 'amount'> & {
    agency: string,
    account: string,
}
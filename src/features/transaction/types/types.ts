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
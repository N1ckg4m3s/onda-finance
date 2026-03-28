export type Account = {
    agency: string;
    account: string;
    balance: number;
    owderName: string
};

export type AccountResume = Omit<Account, 'balance'>

export type AuthSession = {
    token: string,
    account: {
        id: string,
        agency: string,
        account: string,
        ownerName: string,
    }
}
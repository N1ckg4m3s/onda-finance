export type AuthSession = {
    token: string,
    account: {
        id: string,
        agency: string,
        account: string,
        ownerName: string,
    }
}
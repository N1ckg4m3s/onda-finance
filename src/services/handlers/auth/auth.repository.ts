export const authRepository = {
    validateCredentials: async (account: string, agency: string,) => {
        // banco mock
        if (account !== "101010" || agency !== "0001") throw new Error('No Account');

        //retorno de sucesso
        return {
            id: "acc_1",
            agency,
            account,
            ownerName: "Mock owner",
            balance: 1000
        }
    }
}
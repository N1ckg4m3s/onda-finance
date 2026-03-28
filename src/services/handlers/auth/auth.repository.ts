import { FAKE_DB } from "../../../infra/db/FAKE_DB";
import { generateAccountKey } from "../transaction/transaction.helper";
export const authRepository = {
    validateCredentials: async (account: string, agency: string,) => {
        // banco mock
        const accountKey = generateAccountKey({ account, agency })

        const userAccount = FAKE_DB.accounts[accountKey]
        if (!userAccount) throw new Error('No Account');

        //retorno de sucesso
        return {
            id: accountKey,
            ...userAccount
        }
    },
}
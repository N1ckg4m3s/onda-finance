import { accountRepository } from "./account.repository";

export const accountService = {
    getUserBalance: async (accountKey: string) => {
        return accountRepository.getUserBalance(accountKey)
    },
}
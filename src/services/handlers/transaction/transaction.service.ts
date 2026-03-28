import { generateAccountKey } from "./transaction.helper"
import { transactionRepository } from "./transaction.repository"

export const transactionService = {
    getTransactions: async ({ query }: any) => {
        const {
            page = 1,
            limit = 10,
            account,
            agency
        } = query

        const accountKey = generateAccountKey({ account, agency })

        const transactions = await transactionRepository.getTransactions({ page, limit, accountKey })

        return transactions
    },

    newTransactions: async ({ body }: any) => {
        console.log('transactionService.newTransactions', body)

    }
}
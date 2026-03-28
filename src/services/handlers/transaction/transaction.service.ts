import type { AccountResume } from "../../../features/auth/types/types"
import { accountRepository } from "../account/account.repository"
import type { CreateTransactionDTO } from "./transaction.DTO"
import { generateAccountKey } from "./transaction.helper"
import { transactionRepository } from "./transaction.repository"

export const transactionService = {
    getTransactions: async (query: any ) => {
        const { page = 1, limit = 10, account, agency } = query

        const accountKey = generateAccountKey({ account, agency })
        const transactions = await transactionRepository.getTransactions({ page, limit, accountKey })

        return transactions
    },

    createTransaction: async (dto: CreateTransactionDTO, sessionAccount: AccountResume) => {
        const fromKey = generateAccountKey(sessionAccount);
        const toKey = generateAccountKey(dto.destination);

        const fromAccount = await accountRepository.getUserBalance(fromKey);
        const toAccount = await accountRepository.getUserBalance(toKey);

        if (!toAccount) throw new Error("Destination account not found");
        if (fromKey === toKey) throw new Error("Invalid transfer; you can't transfer to your self");

        if (fromAccount < dto.amount) throw new Error("Insufficient balance");

        // operação
        const transaction = await transactionRepository.newTransactions(fromKey, {
            type: "out",
            amount: dto.amount,
            destination: dto.destination,
        });

        await transactionRepository.newTransactions(toKey, {
            type: "in",
            amount: dto.amount,
            destination: sessionAccount,
        });

        await accountRepository.applyAmountToAccount(fromKey, -dto.amount);
        await accountRepository.applyAmountToAccount(toKey, dto.amount);

        return {
            transaction,
            newBalance: await accountRepository.getUserBalance(fromKey)
        };
    }
}
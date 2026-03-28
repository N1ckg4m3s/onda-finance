import { transactionService } from "./transaction.service";

export const transactionHandler = {
  getTransactions: async ({ query }: any) => {
    return transactionService.getTransactions(query);
  },

  newTransaction: async ({ body }: any) => {
    return transactionService.newTransactions(body);
  },
};
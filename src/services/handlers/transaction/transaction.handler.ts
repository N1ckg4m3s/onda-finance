import type { AuthSession } from "../../../features/auth/types/types";
import { transactionService } from "./transaction.service";

export const transactionHandler = {
  getTransactions: async ({ query }: any) => {
    if (!query) throw new Error("Missing query");
    return await transactionService.getTransactions(query);
  },

  newTransaction: async ({ body }: any) => {
    //Simulando obtenção da sessão dos cookies
    const session: AuthSession | null = JSON.parse(localStorage.getItem('session') || '')

    if (!session) throw new Error("User disconnected")

    if (!body) throw new Error("Missing body");

    if (!body.destination) throw new Error("Missing transaction destination");
    if (!body.amount) throw new Error("Missing transaction amount");

    return await transactionService.createTransaction(body, {
      account: session.account.account,
      agency: session.account.agency,
      owderName: session.account.ownerName
    });
  },
};
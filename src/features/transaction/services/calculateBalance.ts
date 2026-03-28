import type { Transaction } from "../types/types";

export const calculateBalance = (transactions: Transaction[]) => {
    return transactions.reduce((acc, t) => {
        return t.type === "in"
            ? acc + t.amount
            : acc - t.amount;
    }, 0);
};

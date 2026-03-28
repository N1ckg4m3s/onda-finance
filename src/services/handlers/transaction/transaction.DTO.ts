import { z } from "zod";

const CreateTransactionSchema = z.object({
    amount: z.number(),
    destination: z.object({
        agency: z.string(),
        account: z.string(),
    }),
});

export type CreateTransactionDTO = z.infer<typeof CreateTransactionSchema>;

export const createTransactionDTO = (params: unknown): CreateTransactionDTO => {
    return CreateTransactionSchema.parse(params);
};
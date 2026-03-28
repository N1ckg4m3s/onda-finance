import { z } from "zod";

const LoginSchema = z.object({
    agency: z.string(),
    account: z.string(),
});

export const loginDTO = (params: unknown): { agency: string; account: string } => {
    return LoginSchema.parse(params);
};

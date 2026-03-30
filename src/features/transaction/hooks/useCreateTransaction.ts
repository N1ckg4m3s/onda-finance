import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "../services/createTransaction";
import { useAuthStore } from "../../auth/store/auth.store";

export const useCreateTransaction = () => {
    const session = useAuthStore((state) => state.session);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['balance', session?.account?.account, session?.account?.agency] });
        },
    });
};

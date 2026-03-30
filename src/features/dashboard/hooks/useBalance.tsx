import { useQuery } from "@tanstack/react-query"
import { getUserBalance } from "../service/getUserBalance"
import { useAuthStore } from "../../auth/store/auth.store";

export const useBalance = () => {
    const session = useAuthStore((state) => state.session);

    const {
        data: balance,
        error: balanceError,
        isLoading: balanceLoading
    } = useQuery({
        queryKey: ['balance', session?.account?.account, session?.account?.agency],
        queryFn: getUserBalance
    })

    return { balance, balanceError, balanceLoading }
}
import { useQuery } from "@tanstack/react-query"
import { getUserBalance } from "../service/getUserBalance"

export const useBalance = () => {
    const {
        data: balance,
        error: balanceError,
        isLoading: balanceLoading
    } = useQuery({
        queryKey: ['balance'],
        queryFn: getUserBalance
    })

    return { balance, balanceError, balanceLoading }
}
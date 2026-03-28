import { useQuery } from "@tanstack/react-query"
import { getTransactions } from "../services/getTransactions"
import { useAuthStore } from "../../auth/store/auth.store"

interface hookProps {
    page?: number
    limit?: number
}

export const useTransaction = ({ page, limit }: hookProps) => {
    const { session } = useAuthStore()

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['transactions', { page, limit }],
        queryFn: () => getTransactions({ page, limit, session })
    })

    return { data, error, isLoading, refetch }
}
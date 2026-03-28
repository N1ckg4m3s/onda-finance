import { useState } from "react";
import { api } from "../../../lib/axios";
import { useAuthStore } from "../store/auth.store";
export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { setSession } = useAuthStore()

    const executeLogin = async (data: { agency: string; account: string }) => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.post('/login', data)

            setSession({
                token: response.data.token,
                account: response.data.account
            })

        } catch (err: any) {
            setError(err.message || "Erro ao logar");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        executeLogin,
        loading,
        error,
    };
};

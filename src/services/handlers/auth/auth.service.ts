import { loginDTO } from "./auth.DTO";
import { authRepository } from "./auth.repository";

export const authService = {
    login: async (params: unknown) => {
        const { account, agency } = loginDTO(params)

        const user = await authRepository.validateCredentials(account, agency);

        return {
            token: 'jtw-mock',
            account: user
        }
    },

    logout: async () => { },

    refresh: async () => { },
};

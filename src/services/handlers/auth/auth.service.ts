import { loginDTO } from "./auth.DTO";
import { authRepository } from "./auth.repository";

export const authService = {
    login: async (params: { agency: string; account: string }) => {
        const { account, agency } = loginDTO(params);

        const user = await authRepository.validateCredentials(account, agency);

        return {
            token: "jwt-mock",
            account: user,
        };
    },
};

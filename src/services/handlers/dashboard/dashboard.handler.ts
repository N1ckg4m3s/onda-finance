import type { AuthSession } from "../../../features/auth/types/types";
import { accountService } from "../account/account.service";
import { generateAccountKey } from "../transaction/transaction.helper";

export const dashboardHandler = {
    getUserBalance: async () => {
        //Simulando obtenção da sessão dos cookies
        const session: AuthSession | null = JSON.parse(localStorage.getItem('session') || '')

        if (!session) throw new Error("User disconnected")

        const accountKey = generateAccountKey({
            account: session?.account.account,
            agency: session?.account.agency
        })

        return await accountService.getUserBalance(accountKey);
    }
}
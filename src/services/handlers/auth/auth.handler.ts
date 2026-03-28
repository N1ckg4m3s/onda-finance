import { authService } from "./auth.service";

export const loginHandler = async ({ body }: { body?: any }) => {
    if (!body) throw new Error("Missing body");

    return authService.login(body);
};

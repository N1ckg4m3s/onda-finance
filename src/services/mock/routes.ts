import { loginHandler } from "../handlers/auth/auth.handler";
import { transactionService } from "../handlers/transaction/transaction.service";

type MethodHandler = (params: {
    body?: any,
    query?: any
}) => any;

type HttpMethodMap = {
    get?: MethodHandler;
    post?: MethodHandler;
    put?: MethodHandler;
    delete?: MethodHandler;
};

type ApiRoutes = Record<string, HttpMethodMap>;

export const apiRoutes: ApiRoutes = {
    "/login": {
        post: loginHandler,
    },
    "/dashboard": {
        get: console.log
    },
    "/transaction": {
        get: transactionService.getTransactions,
        post: transactionService.newTransactions
    }
};

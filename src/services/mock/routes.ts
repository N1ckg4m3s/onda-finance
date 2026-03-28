import { loginHandler } from "../handlers/auth/auth.handler";
import { transactionHandler } from "../handlers/transaction/transaction.handler";

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
        get: transactionHandler.getTransactions,
        post: transactionHandler.newTransaction
    }
};

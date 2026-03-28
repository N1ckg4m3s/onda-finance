import { loginHandler } from "../handlers/auth/auth.handler";
import { dashboardHandler } from "../handlers/dashboard/dashboard.handler";
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
        get: dashboardHandler.getUserBalance
    },
    "/transaction": {
        get: transactionHandler.getTransactions,
        post: transactionHandler.newTransaction
    }
};

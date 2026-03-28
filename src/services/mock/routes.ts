import { authService } from "../handlers/auth/auth.service";

type MethodHandler = (params: unknown) => unknown;

type HttpMethodMap = {
    get?: MethodHandler;
    post?: MethodHandler;
    put?: MethodHandler;
    delete?: MethodHandler;
};

type ApiRoutes = Record<string, HttpMethodMap>;

export const apiRoutes: ApiRoutes = {
    "/login": {
        post: (params) => authService.login(params),
    },
    "/dashboard": {
        get: (params) => console.log(params)
    },
    "/transference": {
        get: (params) => console.log(params),
        post: (params) => console.log(params)
    }
};

import axios from "axios";
import { apiRoutes } from "../services/mock/routes";
import { fakeDelay, generateError } from "../services/axios.helpe";

// Criando a instancia do axios
export const api = axios.create({ baseURL: "/mock" });

// Interceptador para emular a requisição a api
api.interceptors.request.use(async (config) => {
    await fakeDelay(200 + Math.random() * 500); // uma demora entre 0 a 500ms

    const method = config.method as "get" | "post";
    const path = config.url as keyof typeof apiRoutes;

    const endpoint = apiRoutes[path]
    if (!endpoint) return generateError(404, "Not Found");

    const handler = endpoint[method];
    if (!handler) return generateError(405, "Method Not Allowed")

    const handlerPayload = {
        body: config.data,
        query: config.params,
        headers: config.headers,
    };
    const data = await handler(handlerPayload);

    return {
        ...config,
        adapter: async () => ({
            data,
            status: 200,
            statusText: "OK",
            headers: {},
            config,
        }),
    };
});


export type ApiRequest<TBody = unknown, TQuery = unknown> = {
    body?: TBody;
    query?: TQuery;
};

export type Handler<TBody = unknown, TQuery = unknown, TResponse = unknown> = (
    req: ApiRequest<TBody, TQuery>
) => TResponse | Promise<TResponse>;

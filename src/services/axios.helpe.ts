export const fakeDelay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const generateError = (status: number, menssage: string): Promise<never> => {
    return Promise.reject({
        response: { status, data: menssage },
    })
}
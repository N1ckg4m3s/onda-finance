import { api } from "../../../lib/axios"

export const getUserBalance = async () => {
    const response = await api.get('/dashboard')
    
    return response.data;
}
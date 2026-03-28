import { create } from 'zustand'
import type { AuthSession } from '../types/types';

type AuthState = {
    session: AuthSession | null,
    setSession: (session: AuthSession) => void,
    logout: () => void
}

const sessionOnStorage = localStorage.getItem('session')

export const useAuthStore = create<AuthState>((set) => ({
    session: sessionOnStorage ? JSON.parse(sessionOnStorage) : null,

    logout() {
        localStorage.removeItem('session')
        set({ session: null })
    },

    setSession(session) {
        localStorage.setItem('session', JSON.stringify(session))
        set({ session })
    },
}));
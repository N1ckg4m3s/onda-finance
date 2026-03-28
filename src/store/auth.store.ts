import { create } from 'zustand'

type Session = {
    token: string,
    account: {
        id: string,
        agency: string,
        account: string,
        ownerName: string,
    }
}

type AuthState = {
    session: Session | null,
    setSession: (session: Session) => void,
    logount: () => void
}

const sessionOnStorage = localStorage.getItem('session')

export const useAuthStore = create<AuthState>((set) => ({
    session: sessionOnStorage ? JSON.parse(sessionOnStorage) : null,

    logount() {
        localStorage.removeItem('session')
        set({ session: null })
    },

    setSession(session) {
        localStorage.setItem('session', JSON.stringify(session))
        set({ session })
    },
}));
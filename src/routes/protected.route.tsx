import { useAuthStore } from "../store/auth.store"
import { Navigate } from "react-router-dom"

interface props {
    children: React.ReactNode
}

export const ProtectedRoute: React.FC<props> = ({ children }) => {
    const session = useAuthStore((state) => state.session);

    if (!session) return <Navigate to='/' replace />;

    return <>{children}</>
}
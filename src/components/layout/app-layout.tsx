import { Button } from "../ui/button";
import { useAuthStore } from "../../features/auth/store/auth.store";
import { useNavigate } from "react-router-dom";

interface props {
    children: React.ReactNode
}

export const AppLayout: React.FC<props> = ({ children }) => {
    const navigate = useNavigate()
    const { session, logout } = useAuthStore();

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const isDashboard = location.pathname === "/dashboard";

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen text-white">

            {/* NAVBAR */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                    {!isDashboard && (
                        <Button
                            variant="ghost"
                            onClick={handleBack}
                            className="text-black"
                        >
                            ← Voltar
                        </Button>
                    )}

                    <div className="font-semibold text-black">
                        Onda Finance
                    </div>
                </div>

                <div className="text-xs text-slate-800">
                    Bem-vindo
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-slate-700 rounded-full" />

                    <span className="text-sm text-slate-600">
                        {session?.account.agency} / {session?.account.account}
                    </span>

                    <Button variant="link" onClick={handleLogout}>
                        Sair
                    </Button>
                </div>
            </header>

            {/* CONTENT */}
            <main className="p-6">
                {children}
            </main>

        </div>
    );
};

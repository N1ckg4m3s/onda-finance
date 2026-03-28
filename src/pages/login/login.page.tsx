import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../features/auth/hooks/useLogin"

const schema = z.object({
    agency: z.string().min(1),
    account: z.string().min(1),
});
type FormData = z.infer<typeof schema>;

export const LoginPage = () => {
    const navigate = useNavigate()
    const { executeLogin, error, loading } = useLogin()
    const form = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const onSubmit = async (data: FormData) => {
        const { account, agency } = data
        try {
            await executeLogin({ account, agency })

            // Migrando para o dashboard
            navigate('/dashboard')
        } catch {
            return;
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">

            <Card className="w-full max-w-sm">

                <CardHeader>
                    <CardTitle className="text-center">Login</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">

                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                        <div className="space-y-2">
                            <Label htmlFor="agency">Agência</Label>
                            <Input id="agency" placeholder="Agencia [0001]" {...form.register("agency")} />

                            {form.formState.errors.agency && (
                                <p className="text-sm text-red-500">
                                    Agência obrigatória
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="account">Conta</Label>
                            <Input id="account" placeholder="Conta [101010]" {...form.register("account")} />

                            {form.formState.errors.account && (
                                <p className="text-sm text-red-500">
                                    Conta obrigatória
                                </p>
                            )}
                        </div>

                        <Button className="w-full" type="submit">
                            {loading ? "Entrando..." : "Entrar"}
                        </Button>
                    </form>

                    {error && (
                        <p className="text-sm text-red-500 text-center">
                            {error}
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
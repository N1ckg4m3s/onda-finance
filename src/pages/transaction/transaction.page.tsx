import './transaction.style.css'

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { AppLayout } from "../../components/layout/app-layout";
import { useCreateTransaction } from "../../features/transaction/hooks/useCreateTransaction";
import { useAuthStore } from "../../features/auth/store/auth.store";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

const schema = z.object({
    agency: z.string().min(1, "Agência obrigatória"),
    account: z.string().min(1, "Conta obrigatória"),
    amount: z.number().positive("Valor deve ser maior que 0"),
});

type FormData = z.infer<typeof schema>;

export const TransactionPage = () => {
    const { session } = useAuthStore()
    const mutation = useCreateTransaction()
    const [isSuccess, setSuccess] = useState(false)

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        if (!session) return;
        mutation.mutate({
            from: {
                account: session?.account.account,
                agency: session?.account.agency
            },
            destination: {
                agency: data.agency,
                account: data.account,
            },
            amount: data.amount
        }, {
            onSuccess: () => {
                form.reset()
                setSuccess(true)
                setTimeout(() => setSuccess(false), 1000)
            }
        })

    };

    return (
        <AppLayout>
            <div className="flex items-center justify-center">

                <Card className="w-full max-w-md">

                    <CardHeader>
                        <CardTitle className="text-center">
                            Nova Transferência
                        </CardTitle>
                    </CardHeader>

                    <CardContent>

                        {
                            isSuccess && (
                                <div className="flex flex-col items-center justify-center py-10 animate-fade-in">
                                    <CheckCircle className="text-green-500 w-12 h-12 mb-2" />
                                    <p className="text-green-500 font-medium">
                                        Transferência realizada com sucesso
                                    </p>
                                </div>
                            ) || (
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-4"
                                >

                                    {/* Agência */}
                                    <div className="space-y-2">
                                        <Label>Agência</Label>
                                        <Input
                                            placeholder="0001"
                                            {...form.register("agency")}
                                        />
                                        {form.formState.errors.agency && (
                                            <span className="text-xs text-red-500">
                                                {form.formState.errors.agency.message}
                                            </span>
                                        )}
                                    </div>

                                    {/* Conta */}
                                    <div className="space-y-2">
                                        <Label>Conta</Label>
                                        <Input
                                            placeholder="202020"
                                            {...form.register("account")}
                                        />
                                        {form.formState.errors.account && (
                                            <span className="text-xs text-red-500">
                                                {form.formState.errors.account.message}
                                            </span>
                                        )}
                                    </div>

                                    {/* Valor */}
                                    <div className="space-y-2">
                                        <Label>Valor</Label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            placeholder="100.00"
                                            {...form.register("amount", { valueAsNumber: true })}
                                        />
                                        {form.formState.errors.amount && (
                                            <span className="text-xs text-red-500">
                                                {form.formState.errors.amount.message}
                                            </span>
                                        )}
                                    </div>

                                    {/* Botão */}
                                    <Button disabled={mutation.isPending} className="w-full">
                                        {mutation.isPending ? "Enviando..." : "Transferir"}
                                    </Button>

                                    {mutation.isError && (
                                        <span className="text-red-500 text-sm">
                                            {String(mutation.error)}
                                        </span>
                                    )}

                                </form>
                            )
                        }

                    </CardContent>

                </Card>

            </div>
        </AppLayout>
    );
};

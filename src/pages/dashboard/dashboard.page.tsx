import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { AppLayout } from "../../components/layout/app-layout";
import { useTransaction } from "../../features/transaction/hooks/useTransaction";
import { useState } from "react";
import { Skeleton } from "../../components/ui/skeleton";
import type { Transaction } from "../../features/transaction/types/types";
import { TransactionComponent } from "./transaction.card";
import { formatCurrency } from "../../lib/format/currency";
import { calculateBalance } from "../../features/transaction/services/calculateBalance";
import { PaginationComponent } from "../../components/pagination.component";
import { useNavigate } from "react-router-dom";


export const DashboardPage = () => {
    const navigate = useNavigate()
    const [page, setPage] = useState(1);
    const { data, error, isLoading } = useTransaction({ page, limit: 10 })

    const amountPage = data && Math.floor(data.total / data.limit) || 0

    return (
        <AppLayout>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Saldo */}
                <Card>
                    <CardHeader>
                        <CardTitle>Saldo disponivel</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading && (
                            <div className="space-y-3">
                                <Skeleton className="h-8 w-1/3" />
                            </div>
                        )}

                        {error && (
                            <div className="text-sm text-red-500">
                                R$ --,--
                            </div>
                        )}

                        {!isLoading && !error &&
                            <p className="text-2xl font-bold">{formatCurrency(calculateBalance(data.data || {}))}</p>
                        }

                    </CardContent>
                </Card>

                {/* Ações */}
                <Card className="flex items-center justify-center">
                    <Button variant={"ghost"} className="w-full"
                        onClick={() => navigate('/transaction')}
                    >
                        Nova Transferência
                    </Button>
                </Card>

                {/* Lista */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Transações</CardTitle>
                    </CardHeader>

                    {isLoading && (
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    )}

                    {error && (
                        <div className="text-sm text-red-500">
                            Erro ao carregar transações
                        </div>
                    )}

                    {!isLoading && !error && (
                        <>
                            <CardContent className="space-y-3">
                                {
                                    data.data.map(
                                        (t: Transaction) =>
                                            <TransactionComponent
                                                key={t.id}
                                                transaction={t}
                                            />
                                    )
                                }
                            </CardContent>

                            <PaginationComponent
                                actualPage={page}
                                changePage={(page) => setPage(page)}
                                totalPages={amountPage}
                            />
                        </>
                    )}

                </Card>
            </div>
        </AppLayout>
    );
};

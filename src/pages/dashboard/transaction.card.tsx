import { ArrowDownLeft, ArrowUpRight } from "lucide-react"
import type { Transaction } from "../../features/transaction/types/types"
import { formatCurrency } from "../../lib/format/currency"
import { formatDate } from "../../lib/format/date"

interface props {
    transaction: Pick<Transaction, 'type' | 'amount' | 'destination' | 'created_at'>
}

export const TransactionComponent: React.FC<props> = ({ transaction }) => {
    const renderArrow = transaction.type === 'in' ?
        <ArrowUpRight className="text-green-500" size={18} /> :
        <ArrowDownLeft className="text-red-500" size={18} />

    const amountColor = transaction.type === 'in' ?
        'text-green-500' :
        'text-red-500'

    console.log(transaction.created_at)

    return <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">
            {renderArrow}

            <div className="flex flex-col">
                <span>{transaction.destination.ownerName}</span>
                <span className="text-xs text-slate-400">
                    {formatDate(transaction.created_at)}
                </span>
            </div>

        </div>

        <span className={`${amountColor} font-medium`}>
            {formatCurrency(transaction.amount)}
        </span>

    </div>
}
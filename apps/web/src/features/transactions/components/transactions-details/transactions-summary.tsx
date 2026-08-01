import { BuildingIcon, Money01Icon, TextNumberSignIcon, UserIcon } from '@hugeicons/core-free-icons'
import { truncate } from 'es-toolkit/compat'

import { MetaCard } from '@/components/meta-card'
import type { TransactionWithDocument } from '@/server/repositories/transactions/get-transaction-with-document'
import { formatNumber } from '@/utils/format-number'

interface TransactionsSummaryProps {
  transactionWithDocument: TransactionWithDocument
}

export default function TransactionsSummary({ transactionWithDocument }: TransactionsSummaryProps) {
  const transaction = transactionWithDocument.cost_transactions_table

  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetaCard.Root>
          <MetaCard.Icon icon={TextNumberSignIcon} c />
          <MetaCard.Description>Номер</MetaCard.Description>
          <MetaCard.Title>{transaction.snapshot.document.enumeration}</MetaCard.Title>
        </MetaCard.Root>
        <MetaCard.Root>
          <MetaCard.Icon icon={UserIcon} />
          <MetaCard.Description>Клиент</MetaCard.Description>
          <MetaCard.Title>{transaction.snapshot.customer.fullnameClient}</MetaCard.Title>
        </MetaCard.Root>
        <MetaCard.Root>
          <MetaCard.Icon icon={BuildingIcon} />
          <MetaCard.Description>Оргонизация</MetaCard.Description>
          <MetaCard.Title
            className="text-sm"
            title={transaction.snapshot.organization.organization}
          >
            {truncate(transaction.snapshot.organization.organization)}
          </MetaCard.Title>
        </MetaCard.Root>
        <MetaCard.Root>
          <MetaCard.Icon icon={Money01Icon} />
          <MetaCard.Description>Сумма</MetaCard.Description>
          <MetaCard.Title>
            {formatNumber(transaction.snapshot.organization.totalCost)} ₸
          </MetaCard.Title>
        </MetaCard.Root>
      </div>
    </>
  )
}

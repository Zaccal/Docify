import { UserIcon } from '@hugeicons/core-free-icons'

import type { TransactionWithDocument } from '@/server/repositories/transactions/get-transaction-with-document'

import DetailSection from '../detail-section'

interface TransactionsCustomerDetailsProps {
  transactionWithDocument: TransactionWithDocument
}

export default function TransactionsCustomerDetails({
  transactionWithDocument
}: TransactionsCustomerDetailsProps) {
  const trunsaction = transactionWithDocument.cost_transactions_table

  return (
    <DetailSection.Root className="h-full">
      <DetailSection.Header>
        <DetailSection.Icon icon={UserIcon} color="green" />
        <DetailSection.Title>Сведения о клиенте</DetailSection.Title>
      </DetailSection.Header>
      <DetailSection.Content>
        <DetailSection.Item keyOfValue="ФИО">
          {trunsaction.snapshot.customer.fullnameClient}
        </DetailSection.Item>
        <DetailSection.Item keyOfValue="ИИН">
          {trunsaction.snapshot.customer.iin}
        </DetailSection.Item>
        <DetailSection.Item keyOfValue="Номер удо">
          {trunsaction.snapshot.customer.clientIdNumber}
        </DetailSection.Item>
        <DetailSection.Item keyOfValue="Дата выдачи">
          {trunsaction.snapshot.customer.clientIdDateFrom}
        </DetailSection.Item>
        <DetailSection.Item keyOfValue="Орган выдачи">
          {trunsaction.snapshot.customer.clientIdType}
        </DetailSection.Item>
      </DetailSection.Content>
    </DetailSection.Root>
  )
}

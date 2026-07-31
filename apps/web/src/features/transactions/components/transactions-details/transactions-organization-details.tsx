import { BuildingIcon } from '@hugeicons/core-free-icons'

import DetailSection from '@/components/detail-section'
import type { TransactionWithDocument } from '@/server/repositories/transactions/get-transaction-with-document'

interface TrunsactionsOrganizationDetailsProps {
  transactionWithDocument: TransactionWithDocument
}

export default function TrunsactionsOrganizationDetails({
  transactionWithDocument
}: TrunsactionsOrganizationDetailsProps) {
  const trunsactions = transactionWithDocument.cost_transactions_table

  return (
    <DetailSection.Root className="h-full">
      <DetailSection.Header>
        <DetailSection.Icon icon={BuildingIcon} color="purple" />
        <DetailSection.Title>Сведения о организаций</DetailSection.Title>
      </DetailSection.Header>
      <DetailSection.Content>
        <DetailSection.Item keyOfValue="Организация">
          {trunsactions.snapshot.organization.organization}
        </DetailSection.Item>
        <DetailSection.Item keyOfValue="БИН">
          {trunsactions.snapshot.organization.bin}
        </DetailSection.Item>
        <DetailSection.Item keyOfValue="БИК">
          {trunsactions.snapshot.organization.bik}
        </DetailSection.Item>
        <DetailSection.Item keyOfValue="Город">
          {trunsactions.snapshot.organization.city}
        </DetailSection.Item>
        <DetailSection.Item keyOfValue="Адрес">
          {trunsactions.snapshot.organization.address}
        </DetailSection.Item>
        <DetailSection.Item keyOfValue="Индекс">
          {fallbackEmpty(trunsactions.snapshot.organization.index)}
        </DetailSection.Item>
        <DetailSection.Item keyOfValue="ИИК">
          {trunsactions.snapshot.organization.iik}
        </DetailSection.Item>
        <DetailSection.Item keyOfValue="БИК">
          {trunsactions.snapshot.organization.bik}
        </DetailSection.Item>
        <DetailSection.Item keyOfValue="Банк">
          {trunsactions.snapshot.organization.bank}
        </DetailSection.Item>
        <DetailSection.Item keyOfValue="КБЕ">
          {fallbackEmpty(trunsactions.snapshot.organization.kbe)}
        </DetailSection.Item>
        <DetailSection.Item keyOfValue="КНП">
          {fallbackEmpty(trunsactions.snapshot.organization.knp)}
        </DetailSection.Item>
      </DetailSection.Content>
    </DetailSection.Root>
  )
}

function fallbackEmpty(value: string | null) {
  if (value === '' || value === null) return '--'
  return value
}

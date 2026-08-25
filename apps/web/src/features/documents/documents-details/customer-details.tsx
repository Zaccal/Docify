import { UserIcon } from '@hugeicons/core-free-icons'

import DetailSection from '@/components/detail-section'
import type { FindDocumentByIdResult } from '@/server/repositories/documents/find-document-by-id'

interface CustomerDetailsProps {
  data: FindDocumentByIdResult
}

export default function CustomerDetails({ data }: CustomerDetailsProps) {
  const document = data!

  return (
    <DetailSection.Root>
      <DetailSection.Header>
        <DetailSection.Icon icon={UserIcon} />
        <DetailSection.Title>Сведения о клиенте</DetailSection.Title>
      </DetailSection.Header>
      <DetailSection.Content>
        <DetailSection.Item keyOfValue="ФИО">{document.customer.fullnameClient}</DetailSection.Item>
        <DetailSection.Item keyOfValue="ИИН">{document.customer.iin}</DetailSection.Item>
        <DetailSection.Item keyOfValue="Номер удо">
          {document.customer.clientIdNumber}
        </DetailSection.Item>
        <DetailSection.Item keyOfValue="Дата выдачи">
          {document.customer.clientIdDateFrom}
        </DetailSection.Item>
        <DetailSection.Item keyOfValue="Орган выдачи">
          {document.customer.clientIdType}
        </DetailSection.Item>
      </DetailSection.Content>
    </DetailSection.Root>
  )
}

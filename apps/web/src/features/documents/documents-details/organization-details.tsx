import { BuildingIcon } from '@hugeicons/core-free-icons'

import DetailSection from '@/components/detail-section'
import type { FindDocumentByIdResult } from '@/server/repositories/documents/find-document-by-id'

interface OrganizationDetailsProps {
  data: FindDocumentByIdResult
}

export default function OrganizationDetails({ data }: OrganizationDetailsProps) {
  const document = data!

  return (
    <>
      <DetailSection.Root>
        <DetailSection.Header>
          <DetailSection.Icon icon={BuildingIcon} />
          <DetailSection.Title>Сведения об организации</DetailSection.Title>
        </DetailSection.Header>
        <DetailSection.Content>
          <DetailSection.Item keyOfValue="Организация">
            {document.customer.organization.organization}
          </DetailSection.Item>
          <DetailSection.Item keyOfValue="БИН">
            {document.customer.organization.bin}
          </DetailSection.Item>
          <DetailSection.Item keyOfValue="Город">
            {document.customer.organization.city}
          </DetailSection.Item>
          <DetailSection.Item keyOfValue="Адрес">
            {document.customer.organization.address}
          </DetailSection.Item>
          <DetailSection.Item keyOfValue="Банк">
            {document.customer.organization.bank}
          </DetailSection.Item>
          <DetailSection.Item keyOfValue="ИИК">
            {document.customer.organization.iik}
          </DetailSection.Item>
          <DetailSection.Item keyOfValue="Общая стоимость">
            {new Intl.NumberFormat('ru-RU', {
              style: 'currency',
              currency: 'KZT',
              maximumFractionDigits: 0
            }).format(document.customer.organization.totalCost)}
          </DetailSection.Item>
          <DetailSection.Item keyOfValue="Стоимость за сутки">
            {new Intl.NumberFormat('ru-RU', {
              style: 'currency',
              currency: 'KZT',
              maximumFractionDigits: 0
            }).format(document.customer.organization.costPerDay)}
          </DetailSection.Item>
        </DetailSection.Content>
      </DetailSection.Root>
    </>
  )
}

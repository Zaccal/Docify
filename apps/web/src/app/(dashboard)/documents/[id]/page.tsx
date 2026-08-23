import { Badge } from '@Docify/ui/components/badge'
import { Button } from '@Docify/ui/components/button'
import { Table, TableBody, TableCell, TableRow } from '@Docify/ui/components/table'
import { BuildingIcon, DocumentAttachmentIcon, UserIcon } from '@hugeicons/core-free-icons'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { connection } from 'next/server'
import { Suspense } from 'react'

import DetailSection from '@/components/detail-section'
import { findDocumentById } from '@/server/repositories/documents/find-document-by-id'

interface Params {
  id: string
}

interface PageProps {
  params: Promise<Params>
}

export default function DocumentPage({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="wrapper mt-8">Loading Document...</div>}>
      <DocumentDetails params={params} />
    </Suspense>
  )
}

async function DocumentDetails({ params }: PageProps) {
  await connection()

  const { id } = await params
  const document = await findDocumentById(id)

  if (!document) notFound()

  return (
    <div className="wrapper">
      <div className="mt-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Документ №{document.enumeration}</h1>
          <p className="text-muted-foreground mt-2 text-sm">ID: {document.id}</p>
        </div>
        <Button variant="outline" render={<Link href="/documents" />}>
          Назад к документам
        </Button>
      </div>

      <div className="mt-8 grid items-start gap-4 lg:grid-cols-2">
        <DetailSection.Root>
          <DetailSection.Header>
            <DetailSection.Icon icon={DocumentAttachmentIcon} />
            <DetailSection.Title>Сведения о документе</DetailSection.Title>
          </DetailSection.Header>
          <DetailSection.Content>
            <DetailSection.Item keyOfValue="Номер">№{document.enumeration}</DetailSection.Item>
            <DetailSection.Item keyOfValue="Дата документа">
              <div className="space-x-2">
                {document.documentDate.map((date) => (
                  <Badge key={date}>{date}</Badge>
                ))}
              </div>
            </DetailSection.Item>
            <DetailSection.Item keyOfValue="Создан">
              {formatDate(document.createdAt)}
            </DetailSection.Item>
            <DetailSection.Item keyOfValue="Обновлён">
              {formatDate(document.updatedAt)}
            </DetailSection.Item>
            <DetailSection.Item keyOfValue="Динамические данные">
              <Table>
                <TableBody>
                  {Object.entries(document.cellsLine).map(([label, value]) => (
                    <TableRow key={label}>
                      <TableCell className="text-muted-foreground border text-center">
                        {label}
                      </TableCell>
                      <TableCell className="border text-center whitespace-normal">
                        {value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DetailSection.Item>
          </DetailSection.Content>
        </DetailSection.Root>

        <div className="grid gap-4">
          <DetailSection.Root>
            <DetailSection.Header>
              <DetailSection.Icon icon={UserIcon} />
              <DetailSection.Title>Сведения о клиенте</DetailSection.Title>
            </DetailSection.Header>
            <DetailSection.Content>
              <DetailSection.Item keyOfValue="ФИО">
                {document.customer.fullnameClient}
              </DetailSection.Item>
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
        </div>
      </div>
    </div>
  )
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(date)
}

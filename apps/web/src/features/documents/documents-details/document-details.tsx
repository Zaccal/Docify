import { Badge } from '@Docify/ui/components/badge'
import { Table, TableBody, TableCell, TableRow } from '@Docify/ui/components/table'
import { DocumentAttachmentIcon } from '@hugeicons/core-free-icons'
import { formatDate } from 'date-fns'

import DetailSection from '@/components/detail-section'
import type { FindDocumentByIdResult } from '@/server/repositories/documents/find-document-by-id'

interface DocumentsDetailsProps {
  data: FindDocumentByIdResult
}

export default function DocumentsDetails({ data }: DocumentsDetailsProps) {
  const document = data!

  return (
    <>
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
            {formatDate(document.createdAt, 'dd.MM.yyyy')}
          </DetailSection.Item>
          <DetailSection.Item keyOfValue="Обновлён">
            {formatDate(document.updatedAt, 'dd.MM.yyyy')}
          </DetailSection.Item>
          <DetailSection.Item keyOfValue="Динамические данные">
            <Table>
              <TableBody>
                {Object.entries(document.cellsLine).map(([label, value]) => (
                  <TableRow key={label}>
                    <TableCell className="text-muted-foreground border text-center">
                      {label}
                    </TableCell>
                    <TableCell className="border text-center whitespace-normal">{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DetailSection.Item>
        </DetailSection.Content>
      </DetailSection.Root>
    </>
  )
}

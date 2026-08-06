import { Badge } from '@Docify/ui/components/badge'
import { Table, TableBody, TableCell, TableRow } from '@Docify/ui/components/table'
import { DocumentAttachmentIcon } from '@hugeicons/core-free-icons'

import DetailSection from '@/components/detail-section'
import type { TransactionWithDocument } from '@/server/repositories/transactions/get-transaction-with-document'

interface TransactionsDocumentDetailsProps {
  transactionWithDocument: TransactionWithDocument
}

export default function TransactionsDocumentDetails({
  transactionWithDocument
}: TransactionsDocumentDetailsProps) {
  const transaction = transactionWithDocument.cost_transactions_table
  const document = transactionWithDocument.documents_table

  return (
    <>
      <DetailSection.Root className="h-full">
        <DetailSection.Header>
          <DetailSection.Icon icon={DocumentAttachmentIcon} />
          <DetailSection.Title>Сведения о документе</DetailSection.Title>
        </DetailSection.Header>
        <DetailSection.Content>
          <DetailSection.Item keyOfValue="ID Документа">{document?.id}</DetailSection.Item>
          <DetailSection.Item keyOfValue="Номер Документа">
            {transaction.snapshot.document.enumeration}
          </DetailSection.Item>
          <DetailSection.Item keyOfValue="Дата Документа">
            <div className="space-x-2">
              {transaction.snapshot.document.documentDate.map((date) => (
                <Badge key={date}>{date}</Badge>
              ))}
            </div>
          </DetailSection.Item>
          <DetailSection.Item keyOfValue="Данимические Данные">
            <div className="space-x-2">
              <Table>
                <TableBody>
                  {Object.entries(transaction.snapshot.document.cellsLine).map(([label, value]) => (
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
            </div>
          </DetailSection.Item>
        </DetailSection.Content>
      </DetailSection.Root>
    </>
  )
}

import { Badge } from '@Docify/ui/components/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@Docify/ui/components/breadcrumb'
import { format } from 'date-fns'
import { truncate } from 'es-toolkit/compat'

import type { TransactionWithDocument } from '@/server/repositories/transactions/get-transaction-with-document'

interface TrunsactionsHeaderProps {
  transactionWithDocument: TransactionWithDocument
}

export default function TrunsactionsHeader({ transactionWithDocument }: TrunsactionsHeaderProps) {
  const trunsaction = transactionWithDocument.cost_transactions_table
  const document = transactionWithDocument.documents_table

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Главная</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Операций</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{truncate(trunsaction.operationId)}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <div className="mt-6 flex items-center gap-4">
          <h1 className="text-2xl font-bold">
            Документ №{trunsaction.snapshot.document.enumeration}
          </h1>
          <Badge variant={trunsaction.status === 'POSTED' ? 'success' : 'destructive'}>
            {trunsaction.status === 'POSTED' ? 'Проведено' : 'Не проведено'}
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-muted-foreground">
            Создоно: {document?.createdAt ? format(document.createdAt, 'dd-mm-yyyy') : '--'}
          </p>
          <p className="text-muted-foreground">
            Последния активность:{' '}
            {document?.updatedAt ? format(document.updatedAt, 'dd-mm-yyyy') : '--'}
          </p>
        </div>
      </div>
    </>
  )
}

import { NextResponse, type NextRequest } from 'next/server'

import type { TemplateType } from '@/features/documents/form/schemas/document-schema/document.schema'
import { DEFAULT_COMPANY_TYPE, DEFAULT_TEMPLATE_TYPE } from '@/lib/constants'
import { findTransactionsByOperationId } from '@/server/repositories/transactions/find-transactions-by-operation-id'
import { GenerateDocumentsController } from '@/services/documents/generate-documents'
import type { Company } from '@/types/company.type'
import { getAttachmentHeader } from '@/utils/get-attachment-header'
import { restoreTransactionFromSnapshot } from '@/utils/restore-transaction-from-snapshot'

interface Params {
  operationId: string
}

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { operationId } = await params
  const company = decodeURIComponent(
    (req.nextUrl.searchParams.get('company') as string) ?? DEFAULT_COMPANY_TYPE
  ) as Company

  const templateType = decodeURIComponent(
    (req.nextUrl.searchParams.get('templateType') as string) ?? DEFAULT_TEMPLATE_TYPE
  ) as TemplateType

  try {
    const transaction = await findTransactionsByOperationId(operationId)
    if (!transaction) {
      return NextResponse.json({ error: 'Транзакция не найдена' }, { status: 404 })
    }
    const document = restoreTransactionFromSnapshot(transaction.snapshot)

    const buffer = await GenerateDocumentsController(company, document, templateType)

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': getAttachmentHeader(
          `Документы ${document.customer.fullnameClient}.zip`
        )
      }
    })
  } catch (error) {
    console.error('Document generation failed:', error)
    return NextResponse.json({ error: 'Ошибка при генерации документа' }, { status: 500 })
  }
}

import { NextResponse, type NextRequest } from 'next/server'

import { DEFAULT_COMPANY_TYPE, DEFAULT_TEMPLATE_TYPE } from '@/lib/constants'
import type { TemplateType } from '@/schemas/document-schema/document.schema'
import { findDocumentById } from '@/server/repositories/documents/find-document-by-id'
import { GenerateDocumentsController } from '@/services/documents/generate-documents'
import type { Company } from '@/types/company.type'
import { getAttachmentHeader } from '@/utils/get-attachment-header'

interface Params {
  id: string
}

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params
  const company = decodeURIComponent(
    (req.nextUrl.searchParams.get('company') as string) ?? DEFAULT_COMPANY_TYPE
  ) as Company

  const templateType = decodeURIComponent(
    (req.nextUrl.searchParams.get('templateType') as string) ?? DEFAULT_TEMPLATE_TYPE
  ) as TemplateType

  try {
    const document = await findDocumentById(id)
    if (!document) {
      return NextResponse.json({ error: 'Документ не найден' }, { status: 404 })
    }

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

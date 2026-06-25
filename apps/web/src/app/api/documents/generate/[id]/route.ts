import { NextResponse, type NextRequest } from 'next/server'

import { findDocumentById } from '@/controllers/documents/find-by-id'
import GenerateDocumentsController from '@/controllers/documents/generate-documents.controller'
import type { Organization } from '@/types/organization.type'

interface Params {
  id: string
}

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params
  const organization =
    (decodeURIComponent(req.nextUrl.searchParams.get('organization') as string) as Organization) ??
    'XANSHA'

  try {
    const document = await findDocumentById(id)
    if (!document) {
      return NextResponse.json({ error: 'Документ не найден' }, { status: 404 })
    }

    const buffer = await GenerateDocumentsController(organization, document)

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="lease-agreement-${id}.docx"`
      }
    })
  } catch (error) {
    console.error('Document generation failed:', error)
    return NextResponse.json({ error: 'Ошибка при генерации документа' }, { status: 500 })
  }
}

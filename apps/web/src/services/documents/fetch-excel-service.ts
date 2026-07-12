import { env } from '@Docify/env/server'

import type { TemplateType } from '@/schemas/document-schema/document.schema'
import type { Company } from '@/types/company.type'
import type { FindDocumentByIdData } from '@/types/find-document-by-id.type'

export async function fetchExcelService(
  company: Company,
  document: NonNullable<FindDocumentByIdData>,
  templateType: TemplateType = 'APARTMENT'
) {
  const baseURL = env.EXCEL_SERVICE_URL.replace(/\/$/, '')
  const response = await fetch(
    `${baseURL}/generate?org=${encodeURIComponent(company)}&template=${encodeURIComponent(templateType)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(document)
    }
  )

  if (!response.ok) {
    const error = await readExcelServiceError(response)
    throw new Error(`Excel service failed: ${error}`)
  }

  return Buffer.from(await response.arrayBuffer())
}

async function readExcelServiceError(response: Response) {
  try {
    const body = (await response.json()) as { error?: string }
    return body.error ?? response.statusText
  } catch {
    return response.statusText
  }
}

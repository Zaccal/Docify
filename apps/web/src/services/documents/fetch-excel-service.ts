import { env } from '@Docify/env/server'

import type { FindDocumentByIdData } from '@/types/find-document-by-id.type'
import type { Organization } from '@/types/organization.type'

export async function fetchExcelService(
  organization: Organization,
  document: NonNullable<FindDocumentByIdData>
) {
  const baseURL = env.EXCEL_SERVICE_URL.replace(/\/$/, '')
  const response = await fetch(`${baseURL}/generate?org=${encodeURIComponent(organization)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(document)
  })

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

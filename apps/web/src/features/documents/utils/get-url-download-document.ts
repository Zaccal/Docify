import { DEFAULT_TEMPLATE_TYPE } from '@/lib/constants'
import type { Company } from '@/types/company.type'

import type { TemplateType } from '../form/schemas/document-schema/document.schema'

export function getUrlDownloadDocument(
  documentId: string,
  company: Company,
  templateType: TemplateType = DEFAULT_TEMPLATE_TYPE
) {
  return `/api/documents/generate/${documentId}?company=${encodeURIComponent(company)}&templateType=${encodeURIComponent(templateType)}`
}

export function getUrlDownloadDocumentSnapshot(
  operationID: string,
  company: Company,
  templateType: TemplateType = DEFAULT_TEMPLATE_TYPE
) {
  return `/api/documents/generate/snapshot/${operationID}?company=${encodeURIComponent(company)}&templateType=${encodeURIComponent(templateType)}`
}

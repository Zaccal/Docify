import { DEFAULT_TEMPLATE_TYPE } from '@/lib/constants'
import type { TemplateType } from '@/schemas/document-schema/document.schema'
import type { Company } from '@/types/company.type'

export function getUrlDownloadDocument(
  documentId: string,
  company: Company,
  templateType: TemplateType = DEFAULT_TEMPLATE_TYPE
) {
  return `/api/documents/generate/${documentId}?company=${encodeURIComponent(company)}&templateType=${encodeURIComponent(templateType)}`
}

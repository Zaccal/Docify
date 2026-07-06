import { DEFAULT_TEMPLATE_TYPE } from '@/lib/constants'
import type { TemplateType } from '@/schemas/document-schema/document.schema'
import type { Organization } from '@/types/organization.type'

export function getUrlDownloadDocument(
  documentId: string,
  organization: Organization,
  templateType: TemplateType = DEFAULT_TEMPLATE_TYPE
) {
  return `/api/documents/generate/${documentId}?organization=${encodeURIComponent(organization)}&templateType=${encodeURIComponent(templateType)}`
}

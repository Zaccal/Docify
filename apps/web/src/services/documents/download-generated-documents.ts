import type { TemplateType } from '@/schemas/document-schema/document.schema'

export function downloadGeneratedDocument(
  documentId: string,
  organization: string,
  templateType: TemplateType = 'APARTMENT'
) {
  const url = `/api/documents/generate/${documentId}?organization=${encodeURIComponent(organization)}&templateType=${encodeURIComponent(templateType)}`
  window.location.assign(url)
}

import type { DocumentFormError } from '@/schemas/document-schema/document.schema'

export interface CreateDocumentState {
  success: boolean
  error?: DocumentFormError
}

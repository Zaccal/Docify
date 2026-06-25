import type {
  DocumentFormError,
  DocumentFormSchema
} from '@/schemas/document-schema/document.schema'

export type CreateDocumentValues = Partial<DocumentFormSchema>

export interface CreateDocumentState {
  success: boolean
  error?: DocumentFormError
  message?: string
  documentId?: string
  values?: CreateDocumentValues
}

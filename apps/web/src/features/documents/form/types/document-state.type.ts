import type {
  DocumentFormError,
  DocumentFormSchema
} from '@/schemas/document-schema/document.schema'

export type DocumentValues = Partial<DocumentFormSchema>

export interface DocumentState {
  success: boolean
  error?: DocumentFormError
  message?: string
  documentId?: string
  values?: DocumentValues
}

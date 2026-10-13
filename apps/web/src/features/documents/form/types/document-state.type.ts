import type { DocumentResult } from '@/types/document-result.type'

import type {
  DocumentFormError,
  DocumentFormSchema
} from '../schemas/document-schema/document.schema'

export type DocumentValues = Partial<DocumentFormSchema>

export interface DocumentState extends DocumentResult<{ documentId: string }> {
  error?: DocumentFormError
  message?: string
  values?: DocumentValues
}

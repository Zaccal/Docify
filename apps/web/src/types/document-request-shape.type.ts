import type { DocumentFormSchema } from '@/features/documents/form/schemas/document-schema/document.schema'

import type { DocumentAction } from './document-action.type'

export type ProcessDocumentRequest = {
  action: DocumentAction
  operationId: string
  data: DocumentFormSchema
}

export type CancelDocumentRequest = {
  action: 'CANCEL'
  operationId: string
  documentId: string
}

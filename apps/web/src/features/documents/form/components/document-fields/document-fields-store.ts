import { createContext, createElement, useContext } from 'react'

import type { DocumentFormError } from '@/schemas/document-schema/document.schema'

import type { DocumentValues } from '../../types/document-state.type'

interface DocumentFieldsContextValue {
  errors?: DocumentFormError
  values?: DocumentValues
}

const DocumentFieldsContext = createContext<DocumentFieldsContextValue>({})

export function DocumentFieldsProvider({
  children,
  errors,
  values
}: {
  children: React.ReactNode
  errors?: DocumentFormError
  values?: DocumentValues
}) {
  return createElement(DocumentFieldsContext.Provider, { value: { errors, values } }, children)
}

export function useDocumentFields() {
  const context = useContext(DocumentFieldsContext)

  if (!context) {
    throw new Error('useCreateDocumentFields must be used within a CreateDocumentFieldsProvider')
  }

  return context
}

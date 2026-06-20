import { createContext, createElement, useContext } from 'react'

import type { DocumentFormError } from '@/schemas/document-schema/document.schema'

interface CreateDocumentFieldsContextValue {
  errors?: DocumentFormError
}

const CreateDocumentFieldsContext = createContext<CreateDocumentFieldsContextValue>({})

export function CreateDocumentFieldsProvider({
  children,
  errors
}: {
  children: React.ReactNode
  errors?: DocumentFormError
}) {
  return createElement(CreateDocumentFieldsContext.Provider, { value: { errors } }, children)
}

export function useCreateDocumentFields() {
  const context = useContext(CreateDocumentFieldsContext)

  if (!context) {
    throw new Error('useCreateDocumentFields must be used within a CreateDocumentFieldsProvider')
  }

  return context
}

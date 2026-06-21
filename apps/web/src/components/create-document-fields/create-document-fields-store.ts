import { createContext, createElement, useContext } from 'react'

import type { DocumentFormError } from '@/schemas/document-schema/document.schema'
import type { CreateDocumentValues } from '@/types/create-document-state.type'

interface CreateDocumentFieldsContextValue {
  errors?: DocumentFormError
  values?: CreateDocumentValues
}

const CreateDocumentFieldsContext = createContext<CreateDocumentFieldsContextValue>({})

export function CreateDocumentFieldsProvider({
  children,
  errors,
  values
}: {
  children: React.ReactNode
  errors?: DocumentFormError
  values?: CreateDocumentValues
}) {
  return createElement(
    CreateDocumentFieldsContext.Provider,
    { value: { errors, values } },
    children
  )
}

export function useCreateDocumentFields() {
  const context = useContext(CreateDocumentFieldsContext)

  if (!context) {
    throw new Error('useCreateDocumentFields must be used within a CreateDocumentFieldsProvider')
  }

  return context
}

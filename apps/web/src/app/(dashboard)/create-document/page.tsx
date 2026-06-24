'use client'

import { Button } from '@Docify/ui/components/button'
import { SecurityWarningIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useActionState, useState } from 'react'
import { toast } from 'sonner'

import { createDocument } from '@/actions/documents/create-documents'
import CreateDocumentFields from '@/components/create-document-fields/create-document-fields'
import ExistingDocumentSearchSection from '@/components/create-document-fields/sections/existing-document-search-section/existing-document-search-section'
import type { CreateDocumentState } from '@/types/create-document-state.type'
import type { SearchResultDocument } from '@/types/search-state.type'
import { documentToFormValues } from '@/utils/documents-to-form-values'

async function handleCreateDocument(prevState: CreateDocumentState, formData: FormData) {
  const result = await createDocument(prevState, formData)

  if (result.success) {
    toast.success('Документ успешно создан')
  }

  return result
}

export default function CreateDocumentPage() {
  const [selectedDocument, setSelectedDocument] = useState<SearchResultDocument | undefined>(
    undefined
  )
  const [state, formAction, pending] = useActionState(handleCreateDocument, {
    success: false,
    values: {}
  })

  const values = selectedDocument ? documentToFormValues(selectedDocument) : state.values

  return (
    <div className="mx-auto max-w-4xl">
      {/* Search */}

      <ExistingDocumentSearchSection onSelect={(document) => setSelectedDocument(document)} />

      {/* Create Document */}
      <form action={formAction}>
        <CreateDocumentFields
          key={selectedDocument?.id ?? 'new-document'}
          errors={state.error}
          values={values}
        />
        {state.message && (
          <div className="bg-destructive/10 text-destructive mt-8 rounded-lg px-6 py-4 text-lg">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={SecurityWarningIcon} />
              <span>{state.message}</span>
            </div>
          </div>
        )}
        <div className="flex items-center justify-end py-8">
          <div className="flex items-center gap-4">
            <Button disabled={pending} type="reset" variant={'secondary'}>
              Сбросить
            </Button>
            <Button loading={pending} type="submit">
              Сохранить документ
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

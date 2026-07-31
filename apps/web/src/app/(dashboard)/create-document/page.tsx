'use client'

import { Button } from '@Docify/ui/components/button'
import { SecurityWarningIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useActionState, useRef, useState } from 'react'
import { toast } from 'sonner'

import { useCompanySelect } from '@/components/company-select/company-select-store'
import { createDocuments } from '@/features/documents/create/actions/create-documents'
import DocumentFields from '@/features/documents/form/components/document-fields/document-fields'
import ExistingDocumentSearchSection from '@/features/documents/form/components/document-fields/sections/existing-document-search-section/existing-document-search-section'
import { useExistingDocumentSearchStore } from '@/features/documents/form/components/document-fields/sections/existing-document-search-section/store'
import type { DocumentState } from '@/features/documents/form/types/document-state.type'
import { documentToFormValues } from '@/features/documents/utils/documents-to-form-values'
import { getUrlDownloadDocument } from '@/features/documents/utils/get-url-download-document'
import { validateTemplateType } from '@/features/documents/utils/templateValidation'
import { useDidUpdate } from '@/hooks/useDidUpdate'
import { useDownload } from '@/hooks/useDownload'

export default function CreateDocumentPage() {
  const operationIdRef = useRef<null | string>(null)
  const { company } = useCompanySelect()
  const { download } = useDownload()

  const [state, formAction, pending] = useActionState(handleCreateDocument, {
    success: false,
    values: {}
  })
  const [values, setValues] = useState(state.values)
  const [formRevision, setFormRevision] = useState(0)
  const { setQuery, setSelected } = useExistingDocumentSearchStore((state) => state)

  useDidUpdate(() => {
    setValues(state.values)
  }, [state.values])

  async function handleCreateDocument(prevState: DocumentState, formData: FormData) {
    operationIdRef.current ??= crypto.randomUUID()

    formData.set('operationId', operationIdRef.current)
    formData.set('company', company)

    let result: DocumentState
    try {
      result = await createDocuments(prevState, formData)
    } catch (err) {
      console.error('createDocument failed:', err)
      toast.error('Не удалось создать документ. Попробуйте ещё раз')
      return {
        success: false,
        values: prevState.values,
        message: 'Произошла непредвиденная ошибка'
      }
    }

    if (result.success && result.documentId) {
      operationIdRef.current = null

      setValues(result.values)
      setFormRevision(formRevision + 1)

      const templateTypeRaw = formData.get('templateType')
      const templateType = validateTemplateType(templateTypeRaw)

      const url = getUrlDownloadDocument(result.documentId, company, templateType)
      const { success } = await download(url)

      if (!success) {
        toast.error('Документ создан, но не удалось скачать файл')
      } else {
        toast.success('Документ успешно создан')
      }
    }

    return result
  }

  function handleReset() {
    setValues({})
    setQuery('')
    setSelected(null)
    setFormRevision(formRevision + 1)
  }

  return (
    <div className="mx-auto max-w-4xl px-4">
      {/* Search */}

      <ExistingDocumentSearchSection
        onSelect={(document) => {
          setValues(documentToFormValues(document))
          setFormRevision(formRevision + 1)
        }}
      />

      {/* Create Document */}
      <form action={formAction}>
        <DocumentFields key={formRevision} errors={state.error} values={values} />
        {state.message && (
          <div className="bg-destructive/10 text-destructive mt-8 rounded-lg px-6 py-4 text-lg">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={SecurityWarningIcon} />
              <span>{state.message}</span>
            </div>
          </div>
        )}
        <div className="flex items-center py-8 md:justify-end">
          <div className="flex w-full flex-col-reverse items-center gap-4 md:w-auto md:flex-row">
            <Button
              disabled={pending}
              type="reset"
              variant={'secondary'}
              className="w-full md:w-auto"
              onClick={handleReset}
            >
              Сбросить
            </Button>
            <Button type="submit" loading={pending} className="w-full md:w-auto">
              Сохранить документ
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

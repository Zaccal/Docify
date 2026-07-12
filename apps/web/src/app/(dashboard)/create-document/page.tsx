'use client'

import { Button } from '@Docify/ui/components/button'
import { SecurityWarningIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useActionState, useRef, useState } from 'react'
import { toast } from 'sonner'

import { createDocuments } from '@/actions/documents/create-documents'
import { useCompanySelect } from '@/components/company-select/company-select-store'
import CreateDocumentFields from '@/components/create-document-fields/create-document-fields'
import ExistingDocumentSearchSection from '@/components/create-document-fields/sections/existing-document-search-section/existing-document-search-section'
import { useDownload } from '@/hooks/useDownload'
import { DEFAULT_TEMPLATE_TYPE } from '@/lib/constants'
import { templateTypeSchema } from '@/schemas/document-schema/document.schema'
import type { CreateDocumentState } from '@/types/create-document-state.type'
import type { SearchResultDocument } from '@/types/search-state.type'
import { documentToFormValues } from '@/utils/documents-to-form-values'
import { getUrlDownloadDocument } from '@/utils/get-url-download-document'

export default function CreateDocumentPage() {
  const operationIdRef = useRef<null | string>(null)
  const { company } = useCompanySelect()
  const { download } = useDownload()
  const [selectedDocument, setSelectedDocument] = useState<SearchResultDocument | undefined>(
    undefined
  )
  async function handleCreateDocument(prevState: CreateDocumentState, formData: FormData) {
    operationIdRef.current ??= crypto.randomUUID()

    formData.set('operationId', operationIdRef.current)
    formData.set('company', company)

    let result: CreateDocumentState
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

      // TODO: Move to utils
      const templateTypeRaw = formData.get('templateType')
      const parsedTemplateType = templateTypeSchema.safeParse(templateTypeRaw)
      const templateType = parsedTemplateType.success
        ? parsedTemplateType.data
        : DEFAULT_TEMPLATE_TYPE

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

  const [state, formAction, pending] = useActionState(handleCreateDocument, {
    success: false,
    values: {}
  })

  const values = selectedDocument ? documentToFormValues(selectedDocument) : state.values

  return (
    <div className="mx-auto max-w-4xl px-4">
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
        <div className="flex items-center py-8 md:justify-end">
          <div className="flex w-full flex-col-reverse items-center gap-4 md:w-auto md:flex-row">
            <Button
              disabled={pending}
              type="reset"
              variant={'secondary'}
              className="w-full md:w-auto"
              onClick={() => setSelectedDocument(undefined)}
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

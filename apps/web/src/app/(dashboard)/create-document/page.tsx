'use client'

import { Button } from '@Docify/ui/components/button'
import { FieldDescription, FieldLegend, FieldSet } from '@Docify/ui/components/field'
import { SecurityWarningIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useActionState } from 'react'
import { toast } from 'sonner'

import { createDocument } from '@/actions'
import CreateDocumentFields from '@/components/create-document-fields/create-document-fields'
import type { CreateDocumentState } from '@/types/create-document-state.type'

async function createDocumentCallback(prevState: CreateDocumentState, formData: FormData) {
  const result = await createDocument(prevState, formData)

  if (result.success) {
    toast.success('Документ успешно создан')
  } else if (result.message) {
    toast.error('Что-то пошло не так', { description: result.message })
  }

  return result
}

export default function CreateDocumentPage() {
  const [state, formAction, pending] = useActionState(createDocumentCallback, {
    success: false,
    values: {}
  })

  return (
    <div className="mx-auto max-w-4xl">
      <form action={formAction}>
        <FieldSet>
          <FieldLegend>Создание документа</FieldLegend>
          <FieldDescription>Заполните поля для создания документа</FieldDescription>
        </FieldSet>
        <CreateDocumentFields errors={state.error} values={state.values} />
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

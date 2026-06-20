'use client'

import { Button } from '@Docify/ui/components/button'
import { FieldDescription, FieldLegend, FieldSet } from '@Docify/ui/components/field'
import { useActionState } from 'react'

import { createDocument } from '@/actions'
import CellsBlock from '@/components/cells-block'
import CreateDocumentFields from '@/components/create-document-fields'

export default function CreateDocumentPage() {
  const [state, formAction, pending] = useActionState(createDocument, {
    success: false
  })

  return (
    <div className="mx-auto max-w-4xl">
      <form action={formAction}>
        <FieldSet>
          <FieldLegend>Создание документа</FieldLegend>
          <FieldDescription>Заполните поля для создания документа</FieldDescription>
        </FieldSet>
        <CreateDocumentFields errors={state.error} />
        <CellsBlock errors={state.error} />
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

'use client'

import { Button } from '@Docify/ui/components/button'
import { FieldDescription, FieldLegend, FieldSet } from '@Docify/ui/components/field'
import { useActionState } from 'react'

import { createDocument } from '@/actions'
import BankBlock from '@/components/create-document-blocks/bank-block'
import CellsBlock from '@/components/create-document-blocks/cells-block'
import ClientBlock from '@/components/create-document-blocks/client-block'
import DocumentBlock from '@/components/create-document-blocks/document-block'
import OrganizationBlock from '@/components/create-document-blocks/organization-block'
import CreateDocumentBtnsWrapper from '@/components/create-document-btns-wrapper'

export default function CreateDocumentPage() {
  const [state, formAction] = useActionState(createDocument, {
    success: false
  })

  return (
    <div className="mx-auto max-w-4xl">
      <form action={formAction}>
        <FieldSet>
          <FieldLegend>Создание документа</FieldLegend>
          <FieldDescription>Заполните поля для создания документа</FieldDescription>
        </FieldSet>
        <DocumentBlock errors={state.error} />
        <ClientBlock errors={state.error} />
        <OrganizationBlock errors={state.error} />
        <BankBlock errors={state.error} />
        <CellsBlock errors={state.error} />
        <CreateDocumentBtnsWrapper>
          <Button type="reset" variant={'secondary'}>
            Сбросить
          </Button>
          <Button type="submit">Сохранить документ</Button>
        </CreateDocumentBtnsWrapper>
      </form>
    </div>
  )
}

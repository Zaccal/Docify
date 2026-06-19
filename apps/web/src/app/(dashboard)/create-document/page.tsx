import { Button } from '@Docify/ui/components/button'
import { FieldDescription, FieldLegend, FieldSet } from '@Docify/ui/components/field'

import BankBlock from '@/components/create-document-blocks/bank-block'
import CellsBlock from '@/components/create-document-blocks/cells-block'
import ClientBlock from '@/components/create-document-blocks/client-block'
import DocumentBlock from '@/components/create-document-blocks/document-block'
import OrganizationBlock from '@/components/create-document-blocks/organization-block'

export default function CreateDocumentPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <form>
        <FieldSet>
          <FieldLegend>Создание документа</FieldLegend>
          <FieldDescription>Заполните поля для создания документа</FieldDescription>
        </FieldSet>
        <DocumentBlock />
        <ClientBlock />
        <OrganizationBlock />
        <BankBlock />
        <CellsBlock />
        <div className="flex justify-end gap-4 py-8">
          <Button type="reset" variant={'secondary'}>
            Сбросить
          </Button>
          <Button type="submit">Сохранить документ</Button>
        </div>
      </form>
    </div>
  )
}

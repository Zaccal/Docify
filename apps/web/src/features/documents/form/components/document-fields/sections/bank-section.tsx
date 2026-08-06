import { Field, FieldError, FieldLabel } from '@Docify/ui/components/field'
import { Input } from '@Docify/ui/components/input'
import { BankIcon } from '@hugeicons/core-free-icons'

import DocumentFieldCard from '../../document-field-card/index'
import { useDocumentFields } from '../document-fields-store'

export default function BankSection() {
  const { errors, values } = useDocumentFields()

  return (
    <DocumentFieldCard.Root>
      <DocumentFieldCard.Header
        icon={BankIcon}
        color="orange"
        title="Банковская информация"
        description="Данные о банковской организации"
      />
      <DocumentFieldCard.Content>
        <Field>
          <FieldLabel htmlFor="bank">Название банка</FieldLabel>
          <Input
            aria-invalid={Boolean(errors?.bank?.length)}
            defaultValue={values?.bank}
            name="bank"
            id="bank"
            placeholder="Название банка"
          />
          <FieldError errors={errors?.bank} />
        </Field>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="iik">ИИК</FieldLabel>
            <Input
              aria-invalid={Boolean(errors?.iik?.length)}
              defaultValue={values?.iik ? values?.iik : 'KZ'}
              name="iik"
              id="iik"
              placeholder="20-значный ИИК"
            />
            <FieldError errors={errors?.iik} />
          </Field>
          <Field>
            <FieldLabel htmlFor="bik">БИК</FieldLabel>
            <Input
              aria-invalid={Boolean(errors?.bik?.length)}
              defaultValue={values?.bik}
              name="bik"
              id="bik"
              placeholder="8-значный БИК"
            />
            <FieldError errors={errors?.bik} />
          </Field>
        </div>
      </DocumentFieldCard.Content>
    </DocumentFieldCard.Root>
  )
}

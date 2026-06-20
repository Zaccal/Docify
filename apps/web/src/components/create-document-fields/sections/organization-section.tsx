import { Field, FieldError, FieldLabel } from '@Docify/ui/components/field'
import { Input } from '@Docify/ui/components/input'
import { Building01Icon } from '@hugeicons/core-free-icons'

import CreateDocumentCard from '../../create-document-card/index'
import { useCreateDocumentFields } from '../create-document-fields-store'

export default function OrganizationSection() {
  const { errors } = useCreateDocumentFields()

  return (
    <>
      <CreateDocumentCard.Root>
        <CreateDocumentCard.Header
          icon={Building01Icon}
          color="purple"
          title="Организация"
          description="Данные о организации и локации"
        />
        <CreateDocumentCard.Content>
          <Field>
            <FieldLabel htmlFor="organization">Название организации</FieldLabel>
            <Input
              aria-invalid={Boolean(errors?.organization)}
              id="organization"
              name="organization"
              placeholder="Название организации"
            />
            <FieldError errors={errors?.organization} />
          </Field>
          <div className="grid grid-cols-3 gap-4">
            <Field>
              <FieldLabel htmlFor="bin">БИН</FieldLabel>
              <Input
                aria-invalid={Boolean(errors?.bin)}
                id="bin"
                name="bin"
                placeholder="12-значный БИН"
              />
              <FieldError errors={errors?.bin} />
            </Field>
            <Field>
              <FieldLabel htmlFor="city">Город</FieldLabel>
              <Input
                aria-invalid={Boolean(errors?.city)}
                id="city"
                name="city"
                placeholder="Астана"
              />
              <FieldError errors={errors?.city} />
            </Field>
            <Field>
              <FieldLabel htmlFor="index">Индекс</FieldLabel>
              <Input
                aria-invalid={Boolean(errors?.index)}
                id="index"
                name="index"
                placeholder="600000"
              />
              <FieldError errors={errors?.index} />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="address">Адрес</FieldLabel>
            <Input
              aria-invalid={Boolean(errors?.address?.length)}
              id="address"
              name="address"
              placeholder="Адрес организации"
            />
            <FieldError errors={errors?.address} />
          </Field>
        </CreateDocumentCard.Content>
      </CreateDocumentCard.Root>
    </>
  )
}

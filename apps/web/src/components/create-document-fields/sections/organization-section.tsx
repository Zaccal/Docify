import { Field, FieldError, FieldLabel } from '@Docify/ui/components/field'
import { Input } from '@Docify/ui/components/input'
import { Building01Icon } from '@hugeicons/core-free-icons'

import CreateDocumentCard from '../../create-document-card/index'
import { useCreateDocumentFields } from '../create-document-fields-store'

export default function OrganizationSection() {
  const { errors, values } = useCreateDocumentFields()

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
              defaultValue={values?.organization}
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
                defaultValue={values?.bin}
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
                defaultValue={values?.city}
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
                defaultValue={values?.index}
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
              defaultValue={values?.address}
              id="address"
              name="address"
              placeholder="Адрес организации"
            />
            <FieldError errors={errors?.address} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="kbe">КБЕ</FieldLabel>
              <Input
                aria-invalid={Boolean(errors?.kbe)}
                defaultValue={values?.kbe}
                id="kbe"
                name="kbe"
                placeholder="КБЕ"
              />
              <FieldError errors={errors?.kbe} />
            </Field>
            <Field>
              <FieldLabel htmlFor="knp">КНП</FieldLabel>
              <Input
                aria-invalid={Boolean(errors?.knp)}
                defaultValue={values?.knp}
                id="knp"
                name="knp"
                placeholder="КНП"
              />
              <FieldError errors={errors?.knp} />
            </Field>
          </div>
        </CreateDocumentCard.Content>
      </CreateDocumentCard.Root>
    </>
  )
}

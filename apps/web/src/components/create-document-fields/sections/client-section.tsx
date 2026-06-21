import { Field, FieldError, FieldLabel } from '@Docify/ui/components/field'
import { Input } from '@Docify/ui/components/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@Docify/ui/components/input-group'
import { Dollar, User } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import CreateDocumentCard from '../../create-document-card/index'
import { useCreateDocumentFields } from '../create-document-fields-store'

export default function ClientSection() {
  const { errors, values } = useCreateDocumentFields()

  return (
    <CreateDocumentCard.Root>
      <CreateDocumentCard.Header
        color="blue"
        icon={User}
        title="Информация о клиенте"
        description="Персональные данные и идентификация"
      />
      <CreateDocumentCard.Content>
        <Field>
          <FieldLabel htmlFor="fullnameClient">ФИО</FieldLabel>
          <Input
            name="fullnameClient"
            id="fullnameClient"
            aria-invalid={Boolean(errors?.fullnameClient?.length)}
            defaultValue={values?.fullnameClient}
            placeholder="Иван И.О."
          />
          <FieldError errors={errors?.fullnameClient} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="clientIdNumber">Номер удостоверения</FieldLabel>
            <Input
              name="clientIdNumber"
              id="clientIdNumber"
              aria-invalid={Boolean(errors?.clientIdNumber?.length)}
              defaultValue={values?.clientIdNumber}
              placeholder="1234567890"
            />
            <FieldError errors={errors?.clientIdNumber} />
          </Field>
          <Field>
            <FieldLabel htmlFor="clientIdDateFrom">Дата выдачи удостоверения</FieldLabel>
            <Input
              name="clientIdDateFrom"
              id="clientIdDateFrom"
              aria-invalid={Boolean(errors?.clientIdDateFrom?.length)}
              defaultValue={values?.clientIdDateFrom}
              placeholder="12-12-2024"
            />
            <FieldError errors={errors?.clientIdDateFrom} />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="clientIdType">Тип удостоверения</FieldLabel>
            <Input
              name="clientIdType"
              id="clientIdType"
              aria-invalid={Boolean(errors?.clientIdType?.length)}
              defaultValue={values?.clientIdType}
              placeholder="МВД РК"
            />
            <FieldError errors={errors?.clientIdType} />
          </Field>
          <Field>
            <FieldLabel htmlFor="iin">ИИН</FieldLabel>
            <Input
              name="iin"
              id="iin"
              aria-invalid={Boolean(errors?.iin?.length)}
              defaultValue={values?.iin}
              placeholder="12-значный иин"
            />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="costPerDay">Цена за сутки</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <HugeiconsIcon icon={Dollar} />
            </InputGroupAddon>
            <InputGroupInput
              name="costPerDay"
              id="costPerDay"
              aria-invalid={Boolean(errors?.costPerDay?.length)}
              defaultValue={values?.costPerDay}
              placeholder="0.00"
            />
          </InputGroup>
          <FieldError errors={errors?.costPerDay} />
        </Field>
      </CreateDocumentCard.Content>
    </CreateDocumentCard.Root>
  )
}

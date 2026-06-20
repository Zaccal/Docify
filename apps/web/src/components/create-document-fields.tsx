import { Field, FieldError, FieldLabel } from '@Docify/ui/components/field'
import { Input } from '@Docify/ui/components/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@Docify/ui/components/input-group'
import {
  BankIcon,
  Building01Icon,
  DocumentAttachmentIcon,
  Dollar,
  User
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { DatePicker } from '@/components/date-picker'
import type { DocumentFormError } from '@/schemas/document-schema/document.schema'

import CreateDocumentCard from './create-document-card/index'

interface CreateDocumentFieldsProps {
  errors?: DocumentFormError
}

export default function CreateDocumentFields({ errors }: CreateDocumentFieldsProps) {
  return (
    <>
      <CreateDocumentCard.Root>
        <CreateDocumentCard.Header
          icon={DocumentAttachmentIcon}
          color="green"
          title="Информация о документе"
          description="Данные документа и его статус"
        />
        <CreateDocumentCard.Content>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Нумерация</FieldLabel>
              <Input
                aria-invalid={Boolean(errors?.enumeration?.length)}
                name="enumeration"
                placeholder="0004"
              />
              <FieldError errors={errors?.enumeration} />
            </Field>

            <Field>
              <FieldLabel>Дата документа</FieldLabel>
              <DatePicker name="documentDate" invalid={Boolean(errors?.documentDate?.length)} />
              <FieldError errors={errors?.documentDate} />
            </Field>
          </div>
        </CreateDocumentCard.Content>
      </CreateDocumentCard.Root>

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
                placeholder="МВД РК"
              />
              <FieldError errors={errors?.clientIdType} />
            </Field>
            <Field>
              <FieldLabel htmlFor="clientIdNumber">ИИН</FieldLabel>
              <Input
                name="clientIdNumber"
                id="clientIdNumber"
                aria-invalid={Boolean(errors?.clientIdNumber?.length)}
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
                placeholder="0.00"
              />
            </InputGroup>
            <FieldError errors={errors?.costPerDay} />
          </Field>
        </CreateDocumentCard.Content>
      </CreateDocumentCard.Root>

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

      <CreateDocumentCard.Root>
        <CreateDocumentCard.Header
          icon={BankIcon}
          color="orange"
          title="Банковская информация"
          description="Данные о банковской организации"
        />
        <CreateDocumentCard.Content>
          <Field>
            <FieldLabel htmlFor="bank">Название банка</FieldLabel>
            <Input
              aria-invalid={Boolean(errors?.bank?.length)}
              name="bank"
              id="bank"
              placeholder="Название банка"
            />
            <FieldError errors={errors?.bank} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="iik">ИИК</FieldLabel>
              <Input
                aria-invalid={Boolean(errors?.iik?.length)}
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
                name="bik"
                id="bik"
                placeholder="8-значный БИК"
              />
              <FieldError errors={errors?.bik} />
            </Field>
          </div>
        </CreateDocumentCard.Content>
      </CreateDocumentCard.Root>
    </>
  )
}

import { Field, FieldError, FieldLabel } from '@Docify/ui/components/field'
import { Input } from '@Docify/ui/components/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@Docify/ui/components/input-group'
import { Separator } from '@Docify/ui/components/separator'
import { Dollar, User } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import type { BlockProps } from '@/types/block-props'

export default function ClientBlock({ errors }: BlockProps) {
  return (
    <>
      <div className="bg-card mt-6 rounded-md p-4">
        <div className="flex items-center gap-4">
          <div className="rounded-md bg-blue-100 p-2 text-blue-400">
            <HugeiconsIcon icon={User} />
          </div>
          <div className="">
            <p>Информация о клиенте</p>
            <p className="text-muted-foreground text-sm">Персональные данные и идентификация</p>
          </div>
        </div>
        <Separator className="my-3" />
        <div className="space-y-4">
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
        </div>
      </div>
    </>
  )
}

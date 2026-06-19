import { Field, FieldLabel } from '@Docify/ui/components/field'
import { Input } from '@Docify/ui/components/input'
import { Separator } from '@Docify/ui/components/separator'
import { Building01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export default function OrganizationBlock() {
  return (
    <>
      <div className="bg-card mt-6 rounded-md p-4">
        <div className="flex items-center gap-4">
          <div className="rounded-md bg-purple-100 p-2 text-purple-400">
            <HugeiconsIcon icon={Building01Icon} />
          </div>
          <div className="">
            <p>Организация</p>
            <p className="text-muted-foreground text-sm">Данные о организации и локации</p>
          </div>
        </div>
        <Separator className="my-3" />
        <div className="space-y-4">
          <Field>
            <FieldLabel>Название организации</FieldLabel>
            <Input placeholder="Название организации" />
          </Field>
          <div className="grid grid-cols-3 gap-4">
            <Field>
              <FieldLabel>БИН</FieldLabel>
              <Input placeholder="12-значный БИН" />
            </Field>
            <Field>
              <FieldLabel>Город</FieldLabel>
              <Input placeholder="Астана" />
            </Field>
            <Field>
              <FieldLabel>Индекс</FieldLabel>
              <Input placeholder="600000" />
            </Field>
          </div>
          <Field>
            <FieldLabel>Адрес</FieldLabel>
            <Input placeholder="Адрес организации" />
          </Field>
        </div>
      </div>
    </>
  )
}

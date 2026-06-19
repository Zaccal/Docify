import { Field, FieldLabel } from '@Docify/ui/components/field'
import { Input } from '@Docify/ui/components/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@Docify/ui/components/input-group'
import { Separator } from '@Docify/ui/components/separator'
import { Dollar, User } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export default function ClientBlock() {
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
            <FieldLabel>ФИО</FieldLabel>
            <Input placeholder="Иван И.О." />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Номер удостоверения</FieldLabel>
              <Input placeholder="1234567890" />
            </Field>
            <Field>
              <FieldLabel>Дата выдачи удостоверения</FieldLabel>
              <Input placeholder="12.12.2024" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Тип удостоверения</FieldLabel>
              <Input placeholder="МВД РК" />
            </Field>
            <Field>
              <FieldLabel>ИИН</FieldLabel>
              <Input placeholder="12-значный иин" />
            </Field>
          </div>
          <Field>
            <FieldLabel>Цена за сутки</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <HugeiconsIcon icon={Dollar} />
              </InputGroupAddon>
              <InputGroupInput placeholder="0.00" />
            </InputGroup>
          </Field>
        </div>
      </div>
    </>
  )
}

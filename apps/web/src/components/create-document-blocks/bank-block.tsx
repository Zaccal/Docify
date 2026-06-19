import { Field, FieldLabel } from '@Docify/ui/components/field'
import { Input } from '@Docify/ui/components/input'
import { Separator } from '@Docify/ui/components/separator'
import { BankIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export default function BankBlock() {
  return (
    <>
      <div className="bg-card mt-6 rounded-md p-4">
        <div className="flex items-center gap-4">
          <div className="rounded-md bg-orange-100 p-2 text-orange-400">
            <HugeiconsIcon icon={BankIcon} />
          </div>
          <div className="">
            <p>Информация о банке</p>
            <p className="text-muted-foreground text-sm">Данные о банке</p>
          </div>
        </div>
        <Separator className="my-3" />
        <div className="space-y-4">
          <Field>
            <FieldLabel>Название банка</FieldLabel>
            <Input placeholder="Название банка" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel>ИИК</FieldLabel>
              <Input placeholder="20-значный ИИК" />
            </Field>
            <Field>
              <FieldLabel>БИК</FieldLabel>
              <Input placeholder="8-значный БИК" />
            </Field>
          </div>
        </div>
      </div>
    </>
  )
}

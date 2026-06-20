import { Field, FieldError, FieldLabel } from '@Docify/ui/components/field'
import { Input } from '@Docify/ui/components/input'
import { Separator } from '@Docify/ui/components/separator'
import { BankIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import type { BlockProps } from '@/types/block-props'

export default function BankBlock({ errors }: BlockProps) {
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
        </div>
      </div>
    </>
  )
}

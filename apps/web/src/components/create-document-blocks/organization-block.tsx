import { Field, FieldError, FieldLabel } from '@Docify/ui/components/field'
import { Input } from '@Docify/ui/components/input'
import { Separator } from '@Docify/ui/components/separator'
import { Building01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import type { BlockProps } from '@/types/block-props'

export default function OrganizationBlock({ errors }: BlockProps) {
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
        </div>
      </div>
    </>
  )
}

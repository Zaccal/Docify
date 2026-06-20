import { Field, FieldError, FieldLabel } from '@Docify/ui/components/field'
import { Input } from '@Docify/ui/components/input'
import { Separator } from '@Docify/ui/components/separator'
import { DocumentAttachmentIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import type { BlockProps } from '@/types/block-props'

import { DatePicker } from '../date-picker'

export default function DocumentBlock({ errors }: BlockProps) {
  return (
    <section className="bg-card mt-6 rounded-md p-4">
      <div className="flex items-center gap-4">
        <div className="rounded-md bg-green-100 p-2 text-green-400">
          <HugeiconsIcon icon={DocumentAttachmentIcon} />
        </div>
        <div>
          <p>Информация о документе</p>
          <p className="text-muted-foreground text-sm">Данные документа и его статус</p>
        </div>
      </div>

      <Separator className="my-3" />

      <div className="space-y-4">
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
      </div>
    </section>
  )
}

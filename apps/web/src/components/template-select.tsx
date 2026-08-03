import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@Docify/ui/components/select'
import { useState } from 'react'

import type { TemplateType } from '@/features/documents/form/schemas/document-schema/document.schema'
import { DEFAULT_TEMPLATE_TYPE } from '@/lib/constants'

interface TemplateSelectProps {
  name: string
  defaultValue?: TemplateType
}

const templates = [
  { value: 'APARTMENT', label: 'Квартирная' },
  { value: 'HOTEL', label: 'Гостиничный' }
]

export default function TemplateSelect({ name, defaultValue }: TemplateSelectProps) {
  const [value, setValue] = useState(defaultValue ?? DEFAULT_TEMPLATE_TYPE)

  return (
    <Select
      name={name}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(value) => setValue((value ?? 'APARTMENT') as TemplateType)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Выберите шаблон">
          {templates.find((item) => item.value === value)?.label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {templates.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

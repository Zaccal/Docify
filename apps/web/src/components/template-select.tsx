import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@Docify/ui/components/select'
import { useState } from 'react'

interface TemplateSelectProps {
  name: string
}

const templates = [
  { value: 'APARTMENT', label: 'Квартирная' },
  { value: 'HOTEL', label: 'Гостиничный' }
]

export default function TemplateSelect({ name }: TemplateSelectProps) {
  const [value, setValue] = useState('APARTMENT')

  return (
    <Select
      name={name}
      value={value}
      defaultValue={'APARTMENT'}
      onValueChange={(value) => setValue(value ?? 'APARTMENT')}
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

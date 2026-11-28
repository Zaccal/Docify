'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@Docify/ui/components/select'

interface GenericSelectProps<T extends string> {
  options: {
    name: string
    options: readonly (T | { value: T; label: string })[]
    defaultValue?: T
    placeholder?: string
    testId?: string
  }
  disabled?: boolean
  onValueChange?: (value: T | null) => void
}

export default function GenericSelect<T extends string>({
  options: { name, options, defaultValue, placeholder, testId },
  disabled = false,
  onValueChange
}: GenericSelectProps<T>) {
  const items = options.map((option) =>
    typeof option === 'string' ? { value: option, label: option } : option
  )

  return (
    <Select
      disabled={disabled}
      name={name}
      defaultValue={defaultValue}
      items={items}
      onValueChange={onValueChange}
    >
      <SelectTrigger data-testid={testId}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map(({ value, label }) => (
          <SelectItem
            data-testid={testId ? `${testId}-item-${value}` : undefined}
            key={value}
            value={value}
          >
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

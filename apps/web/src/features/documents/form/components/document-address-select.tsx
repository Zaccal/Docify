import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@Docify/ui/components/select'

import {
  documentAddressSchema,
  type DocumentAddress
} from '@/features/documents/form/schemas/document-schema/document.schema'

interface DocumentAddressSelectProps {
  name: string
  defaultValue?: DocumentAddress
}

export default function DocumentAddressSelect({
  name,
  defaultValue = 'Сарыарка д 6 кв 1'
}: DocumentAddressSelectProps) {
  return (
    <Select name={name} defaultValue={defaultValue}>
      <SelectTrigger data-testid="document-address-select">
        <SelectValue placeholder="Выберите адрес" />
      </SelectTrigger>
      <SelectContent>
        {documentAddressSchema.options.map((value) => (
          <SelectItem
            data-testid={`document-address-select-item-${value}`}
            key={value}
            value={value}
          >
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

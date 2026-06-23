'use client'

import { Calendar } from '@Docify/ui/components/calendar'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@Docify/ui/components/input-group'
import { Popover, PopoverContent, PopoverTrigger } from '@Docify/ui/components/popover'
import { Calendar01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useState } from 'react'
import { type DateRange } from 'react-day-picker'

interface DatePickerProps {
  invalid?: boolean
  name?: string
  fromName?: string
  toName?: string
  defaultValue?: string[]
}

function parseDateFromInput(value?: string) {
  if (!value) {
    return undefined
  }

  const ddMmYyyyMatch = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value)
  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)

  const day = Number(ddMmYyyyMatch?.[1] ?? isoMatch?.[3])
  const month = Number(ddMmYyyyMatch?.[2] ?? isoMatch?.[2])
  const year = Number(ddMmYyyyMatch?.[3] ?? isoMatch?.[1])

  if (!day || !month || !year) {
    return undefined
  }

  const date = new Date(year, month - 1, day)

  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return undefined
  }

  return date
}

function parseDateRangeFromInput(value?: string[]): DateRange | undefined {
  if (!value || value.length !== 2) {
    return undefined
  }

  return {
    from: parseDateFromInput(value[0]),
    to: parseDateFromInput(value[1])
  }
}

function formatDateForInput(date?: Date) {
  if (!date) {
    return ''
  }

  return format(date, 'dd.MM.yyyy')
}

function formatDateRangeForInput(date?: DateRange) {
  if (!date?.from || !date.to) {
    return ''
  }

  return JSON.stringify([formatDateForInput(date.from), formatDateForInput(date.to)])
}

function formatDateRangeForDisplay(date?: DateRange) {
  if (!date?.from) {
    return 'Выберите период'
  }

  if (!date.to) {
    return format(date.from, 'dd MMMM yyyy', { locale: ru })
  }

  return `${format(date.from, 'dd MMMM yyyy', { locale: ru })} - ${format(date.to, 'dd MMMM yyyy', {
    locale: ru
  })}`
}

export function DatePicker({
  invalid,
  name = 'documentDate',
  fromName,
  toName,
  defaultValue
}: DatePickerProps) {
  const [date, setDate] = useState<DateRange | undefined>(() =>
    parseDateRangeFromInput(defaultValue)
  )

  return (
    <Popover>
      <input type="hidden" name={name} value={formatDateRangeForInput(date)} />
      {fromName && <input type="hidden" name={fromName} value={formatDateForInput(date?.from)} />}
      {toName && <input type="hidden" name={toName} value={formatDateForInput(date?.to)} />}
      <PopoverTrigger
        nativeButton={false}
        render={
          <InputGroup aria-invalid={invalid}>
            <InputGroupAddon>
              <HugeiconsIcon icon={Calendar01Icon} />
            </InputGroupAddon>
            <InputGroupInput
              id="date-picker-range"
              readOnly
              tabIndex={-1}
              value={formatDateRangeForDisplay(date)}
              aria-invalid={invalid}
            />
          </InputGroup>
        }
      />
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          locale={ru}
          disabled={{ after: new Date() }}
          captionLayout="dropdown"
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}

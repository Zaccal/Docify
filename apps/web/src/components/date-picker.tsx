'use client'

import { Calendar } from '@Docify/ui/components/calendar'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@Docify/ui/components/input-group'
import { Popover, PopoverContent, PopoverTrigger } from '@Docify/ui/components/popover'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { type DateRange } from 'react-day-picker'

interface DatePickerProps {
  invalid?: boolean
  name?: string
  fromName?: string
  toName?: string
}

function formatDateForInput(date?: Date) {
  if (!date) {
    return ''
  }

  return format(date, 'yyyy-MM-dd')
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

export function DatePicker({ invalid, name = 'documentDate', fromName, toName }: DatePickerProps) {
  const [date, setDate] = useState<DateRange | undefined>(undefined)

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
              <CalendarIcon />
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

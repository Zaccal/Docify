'use client'

import { Calendar } from '@Docify/ui/components/calendar'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@Docify/ui/components/input-group'
import { Popover, PopoverContent, PopoverTrigger } from '@Docify/ui/components/popover'
import { Calendar01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { ru } from 'date-fns/locale'
import { useState } from 'react'
import { type DateRange } from 'react-day-picker'

import {
  formatDateForInput,
  formatDateRangeForDisplay,
  formatDateRangeForInput,
  parseDateRangeFromInput
} from '@/utils/day-picker'

interface DatePickerProps {
  invalid?: boolean
  name?: string
  fromName?: string
  toName?: string
  defaultValue?: string[]
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

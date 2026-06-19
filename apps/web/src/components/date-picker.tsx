'use client'

import { Button } from '@Docify/ui/components/button'
import { Calendar } from '@Docify/ui/components/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@Docify/ui/components/popover'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { type DateRange } from 'react-day-picker'

export function DatePicker() {
  const [date, setDate] = useState<DateRange | undefined>(undefined)

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            id="date-picker-range"
            className="justify-start px-2.5 font-normal"
          >
            <CalendarIcon data-icon="inline-start" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        }
      />
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          locale={ru}
        />
      </PopoverContent>
    </Popover>
  )
}

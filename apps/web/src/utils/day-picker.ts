import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import type { DateRange } from 'react-day-picker'

export function parseDateFromInput(value?: string) {
  if (!value) {
    return undefined
  }
  const ddMmYyyyMatch = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value)
  const ddMmYyyyHyphenMatch = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value)

  const day = Number(ddMmYyyyMatch?.[1] ?? ddMmYyyyHyphenMatch?.[1])
  const month = Number(ddMmYyyyMatch?.[2] ?? ddMmYyyyHyphenMatch?.[2])
  const year = Number(ddMmYyyyMatch?.[3] ?? ddMmYyyyHyphenMatch?.[3])

  if (!day || !month || !year) {
    return undefined
  }

  const date = new Date(year, month - 1, day)

  return date
}

export function parseDateRangeFromInput(value?: string[]): DateRange | undefined {
  if (!value || value.length !== 2) {
    return undefined
  }

  const from = parseDateFromInput(value[0])
  const to = parseDateFromInput(value[1])

  if (!from || !to) {
    return undefined
  }

  return {
    from,
    to
  }
}

export function formatDateForInput(date?: Date) {
  if (!date) {
    return ''
  }

  return format(date, 'dd.MM.yyyy')
}

export function formatDateRangeForInput(date?: DateRange) {
  if (!date?.from || !date.to) {
    return ''
  }

  return JSON.stringify([formatDateForInput(date.from), formatDateForInput(date.to)])
}

export function formatDateRangeForDisplay(date?: DateRange) {
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

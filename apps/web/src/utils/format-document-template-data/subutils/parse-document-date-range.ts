export function parseDocumentDateRange(documentDate: string[]): [Date, Date] {
  const [from, to] = documentDate
  const dateFrom = parseDocumentDate(from)
  const dateTo = parseDocumentDate(to)

  if (!dateFrom || !dateTo) {
    throw new Error('Период документа должен содержать две корректные даты')
  }

  return [dateFrom, dateTo]
}

function parseDocumentDate(value?: string): Date | null {
  if (!value) {
    return null
  }

  const dateParts = value.match(/^(\d{2})[.-](\d{2})[.-](\d{4})$/)

  if (dateParts) {
    const [, day, month, year] = dateParts
    const date = new Date(Number(year), Number(month) - 1, Number(day))

    if (
      date.getFullYear() === Number(year) &&
      date.getMonth() === Number(month) - 1 &&
      date.getDate() === Number(day)
    ) {
      return date
    }
  }

  const isoDateParts = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)

  if (isoDateParts) {
    const [, year, month, day] = isoDateParts
    const date = new Date(Number(year), Number(month) - 1, Number(day))

    if (
      date.getFullYear() === Number(year) &&
      date.getMonth() === Number(month) - 1 &&
      date.getDate() === Number(day)
    ) {
      return date
    }
  }

  return null
}

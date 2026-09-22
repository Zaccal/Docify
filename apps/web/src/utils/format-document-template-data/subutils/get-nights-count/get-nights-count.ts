export function getNightsCount(from: Date | string, to: Date | string): number {
  const fromDate = parseDate(from)
  const toDate = parseDate(to)

  const msInDay = 1000 * 60 * 60 * 24

  return Math.round((toDate.getTime() - fromDate.getTime()) / msInDay)
}

function parseDate(date: Date | string): Date {
  if (date instanceof Date) return date

  const [day, month, year] = date.split('.').map(Number)

  return new Date(year, month - 1, day)
}

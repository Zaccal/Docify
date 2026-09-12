export function parseRussianDate(dateStr: string): Date | null {
  const months: Record<string, number> = {
    января: 0,
    февраля: 1,
    марта: 2,
    апреля: 3,
    мая: 4,
    июня: 5,
    июля: 6,
    августа: 7,
    сентября: 8,
    октября: 9,
    ноября: 10,
    декабря: 11
  }

  const match = dateStr.match(/(\d+)\s+([а-яА-Я]+)\s+(\d{4})/)

  if (!match) {
    return null
  }

  const day = parseInt(match[1]!, 10)
  const monthName = match[2]!.toLowerCase()
  const year = parseInt(match[3]!, 10)

  const monthIndex = months[monthName]

  if (monthIndex === undefined) {
    return null
  }

  return new Date(year, monthIndex, day)
}

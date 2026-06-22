import { DD_MM_YYYY_DATE_REGEX, IIN_OR_BIN_REGEX, ISO_DATE_REGEX } from '@/lib/constants'

function getDateFromParts(year: number, month: number, day: number) {
  const date = new Date(Date.UTC(year, month - 1, day))

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null
  }

  return date
}

function hasValidKazakhstanControlDigit(value: string): boolean {
  if (!IIN_OR_BIN_REGEX.test(value)) {
    return false
  }

  const digits = value.split('').map(Number)
  const getControlDigit = (weights: number[]) =>
    weights.reduce((sum, weight, index) => sum + digits[index] * weight, 0) % 11

  const firstWeights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  const secondWeights = [3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2]
  const firstControlDigit = getControlDigit(firstWeights)
  const controlDigit = firstControlDigit === 10 ? getControlDigit(secondWeights) : firstControlDigit

  return controlDigit !== 10 && controlDigit === digits[11]
}

export function isValidDate(value: string): boolean {
  if (!ISO_DATE_REGEX.test(value)) {
    return false
  }

  const [year, month, day] = value.split('-').map(Number)

  return !!getDateFromParts(year, month, day)
}

export function isNotFutureDate(value: string): boolean {
  if (!isValidDate(value)) {
    return false
  }

  const [year, month, day] = value.split('-').map(Number)
  const date = Date.UTC(year, month - 1, day)
  const now = new Date()
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())

  return date <= today
}

export function isValidDdMmYyyyDate(value: string): boolean {
  if (!DD_MM_YYYY_DATE_REGEX.test(value)) {
    return false
  }

  const [day, month, year] = value.split('.').map(Number)

  return !!getDateFromParts(year, month, day)
}

export function isNotFutureDdMmYyyyDate(value: string): boolean {
  if (!isValidDdMmYyyyDate(value)) {
    return false
  }

  const [day, month, year] = value.split('.').map(Number)
  const date = Date.UTC(year, month - 1, day)
  const now = new Date()
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())

  return date <= today
}

export function isValidIin(value: string): boolean {
  if (!IIN_OR_BIN_REGEX.test(value)) {
    return false
  }

  const yearPart = Number(value.slice(0, 2))
  const month = Number(value.slice(2, 4))
  const day = Number(value.slice(4, 6))
  const centuryDigit = Number(value[6])
  const centuryByDigit: Record<number, number> = {
    1: 1800,
    2: 1800,
    3: 1900,
    4: 1900,
    5: 2000,
    6: 2000
  }
  const century = centuryByDigit[centuryDigit]

  if (!century || !getDateFromParts(century + yearPart, month, day)) {
    return false
  }

  return hasValidKazakhstanControlDigit(value)
}

export function isValidBin(value: string): boolean {
  return hasValidKazakhstanControlDigit(value)
}

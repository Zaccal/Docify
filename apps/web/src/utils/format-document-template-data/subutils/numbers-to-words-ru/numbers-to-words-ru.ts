import { capitalize } from 'es-toolkit'

import { HUNDREDS, ONES, ONES_FEMALE, TEENS, TENS } from '@/lib/constants'

const SCALES = [
  null,
  { one: 'тысяча', few: 'тысячи', many: 'тысяч', female: true },
  { one: 'миллион', few: 'миллиона', many: 'миллионов', female: false },
  { one: 'миллиард', few: 'миллиарда', many: 'миллиардов', female: false },
  { one: 'триллион', few: 'триллиона', many: 'триллионов', female: false },
  { one: 'квадриллион', few: 'квадриллиона', many: 'квадриллионов', female: false }
] as const

export function numberToWordsRu(n: number): string {
  if (!Number.isFinite(n) || !Number.isSafeInteger(n)) {
    throw new Error('number must be a finite safe integer')
  }

  if (n === 0) return 'ноль'

  if (n < 0) {
    throw new Error('negative numbers are not supported')
  }

  const groups: number[] = []
  let value = n

  while (value > 0) {
    groups.push(value % 1000)
    value = Math.floor(value / 1000)
  }

  if (groups.length > SCALES.length) {
    throw new Error('number is too large')
  }

  const result: string[] = []

  for (let scaleIndex = groups.length - 1; scaleIndex >= 0; scaleIndex--) {
    const group = groups[scaleIndex]
    if (group === 0) continue

    const scale = SCALES[scaleIndex]
    result.push(convertBelow1000(group, scale?.female ?? false))

    if (scale) {
      result.push(plural(group, scale.one, scale.few, scale.many))
    }
  }

  return capitalize(result.join(' ').trim())
}

function convertBelow1000(num: number, female: boolean = false): string {
  const words: string[] = []

  const h = Math.floor(num / 100)
  const t = Math.floor((num % 100) / 10)
  const o = num % 10

  if (h > 0) words.push(HUNDREDS[h])

  if (t === 1) {
    words.push(TEENS[o])
  } else {
    if (t > 1) words.push(TENS[t])
    if (o > 0) words.push(female ? ONES_FEMALE[o] : ONES[o])
  }

  return words.join(' ').trim()
}

function plural(n: number, one: string, few: string, many: string): string {
  const lastTwo = n % 100
  if (lastTwo >= 11 && lastTwo <= 19) return many

  const last = n % 10
  if (last === 1) return one
  if (last >= 2 && last <= 4) return few

  return many
}

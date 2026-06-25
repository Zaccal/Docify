import { capitalize } from 'es-toolkit'

import { HUNDREDS, ONES, ONES_FEMALE, TEENS, TENS } from '@/lib/constants'

export function numberToWordsRu(n: number): string {
  if (n === 0) return 'ноль'

  const thousands = Math.floor(n / 1000)
  const rest = n % 1000

  const result: string[] = []

  if (thousands > 0) {
    result.push(convertBelow1000(thousands, true))

    const last = thousands % 10
    const lastTwo = thousands % 100

    if (lastTwo >= 11 && lastTwo <= 19) {
      result.push('тысяч')
    } else if (last === 1) {
      result.push('тысяча')
    } else if (last >= 2 && last <= 4) {
      result.push('тысячи')
    } else {
      result.push('тысяч')
    }
  }

  if (rest > 0) {
    result.push(convertBelow1000(rest))
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

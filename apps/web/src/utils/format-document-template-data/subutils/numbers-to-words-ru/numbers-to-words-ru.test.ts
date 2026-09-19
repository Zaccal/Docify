import { describe, expect, test } from 'bun:test'

import { numberToWordsRu } from '../numbers-to-words-ru/numbers-to-words-ru'

describe('numberToWordsRu', () => {
  test.each([
    [0, 'ноль'],
    [1, 'Один'],
    [2, 'Два'],
    [9, 'Девять'],
    [10, 'Десять'],
    [11, 'Одиннадцать'],
    [19, 'Девятнадцать'],
    [20, 'Двадцать'],
    [21, 'Двадцать один'],
    [100, 'Сто'],
    [101, 'Сто один'],
    [115, 'Сто пятнадцать'],
    [999, 'Девятьсот девяносто девять']
  ])('converts %s to %s', (value, expected) => {
    expect(numberToWordsRu(value)).toBe(expected)
  })

  test.each([
    [1_000, 'Одна тысяча'],
    [2_000, 'Две тысячи'],
    [4_000, 'Четыре тысячи'],
    [5_000, 'Пять тысяч'],
    [11_000, 'Одиннадцать тысяч'],
    [12_000, 'Двенадцать тысяч'],
    [14_000, 'Четырнадцать тысяч'],
    [19_000, 'Девятнадцать тысяч'],
    [20_000, 'Двадцать тысяч'],
    [21_000, 'Двадцать одна тысяча'],
    [22_000, 'Двадцать две тысячи'],
    [25_000, 'Двадцать пять тысяч'],
    [101_000, 'Сто одна тысяча'],
    [111_000, 'Сто одиннадцать тысяч'],
    [112_000, 'Сто двенадцать тысяч'],
    [1_001, 'Одна тысяча один'],
    [2_002, 'Две тысячи два']
  ])('uses feminine thousands and correct endings for %s', (value, expected) => {
    expect(numberToWordsRu(value)).toBe(expected)
  })

  test.each([
    [1_000_000, 'миллион', 'миллиона', 'миллионов'],
    [1_000_000_000, 'миллиард', 'миллиарда', 'миллиардов'],
    [1_000_000_000_000, 'триллион', 'триллиона', 'триллионов'],
    [1_000_000_000_000_000, 'квадриллион', 'квадриллиона', 'квадриллионов']
  ])('uses masculine scale endings for %s', (scale, one, few, many) => {
    expect(numberToWordsRu(scale)).toBe(`Один ${one}`)
    expect(numberToWordsRu(2 * scale)).toBe(`Два ${few}`)
    expect(numberToWordsRu(5 * scale)).toBe(`Пять ${many}`)
  })

  test('uses the many ending for teens and the one ending for twenty-one million', () => {
    expect(numberToWordsRu(11_000_000)).toBe('Одиннадцать миллионов')
    expect(numberToWordsRu(12_000_000)).toBe('Двенадцать миллионов')
    expect(numberToWordsRu(21_000_000)).toBe('Двадцать один миллион')
  })

  test('skips empty groups without introducing extra spaces', () => {
    expect(numberToWordsRu(1_000_002_001)).toBe('Один миллиард две тысячи один')
  })

  test('supports the largest safe integer', () => {
    expect(numberToWordsRu(Number.MAX_SAFE_INTEGER)).toBe(
      'Девять квадриллионов семь триллионов сто девяносто девять миллиардов двести пятьдесят четыре миллиона семьсот сорок тысяч девятьсот девяносто один'
    )
  })

  test.each([-1, -1_000, -Number.MAX_SAFE_INTEGER])('rejects negative integer %s', (value) => {
    expect(() => numberToWordsRu(value)).toThrow('negative numbers are not supported')
  })

  test.each([NaN, Infinity, -Infinity, 0.5, -0.5, Number.MAX_SAFE_INTEGER + 1])(
    'rejects non-finite, fractional, or unsafe number %s',
    (value) => {
      expect(() => numberToWordsRu(value)).toThrow('number must be a finite safe integer')
    }
  )
})

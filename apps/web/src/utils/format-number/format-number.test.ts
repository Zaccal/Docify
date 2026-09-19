import { describe, it, expect } from 'bun:test'

import { formatNumber } from './format-number'

describe('formatNumber', () => {
  it('should format a number correctly', () => {
    const result = formatNumber(1234567.89)
    expect(result).toBe('1 234 567,89')
  })

  it('should format a string correctly', () => {
    const result = formatNumber('1234567.89')
    expect(result).toBe('1 234 567,89')
  })

  it('should return an empty string for invalid input', () => {
    const result = formatNumber()
    expect(result).toBe('')
  })

  it('should format a number with decimal separator correctly', () => {
    const result = formatNumber(1234567.89)
    expect(result).toBe('1 234 567,89')
  })
})

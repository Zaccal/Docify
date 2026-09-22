import { describe, it, expect } from 'bun:test'

import { getNightsCount } from './get-nights-count'

describe('getNightsCount', () => {
  it('should return the correct number of nights using strings dates', () => {
    const result = getNightsCount('01.01.2023', '09.01.2023')
    expect(result).toBe(8)
  })

  it('should return the correct number of nights using date objects', () => {
    const result = getNightsCount(new Date('2023-01-01'), new Date('2023-01-10'))
    expect(result).toBe(9)
  })

  it('should return 0 with invalid dates', () => {
    const result = getNightsCount(new Date('2023-01-01'), new Date('2023-01-01'))
    expect(result).toBe(0)
  })
})

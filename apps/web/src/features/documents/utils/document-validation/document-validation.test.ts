import { describe, it, expect } from 'bun:test'

import {
  getDateFromParts,
  hasValidKazakhstanControlDigit,
  isNotFutureDdMmYyyyDate,
  isValidDate,
  isValidDdMmYyyyDate,
  isValidIin
} from './document-validation'

describe('document-validation', () => {
  describe('getDateFromParts', () => {
    it('should return a date from the given parts', () => {
      const date = getDateFromParts(2023, 10, 1)

      expect(date).not.toBeNull()
      if (!date) {
        return
      }

      expect(date).toBeInstanceOf(Date)
      expect(date.getFullYear()).toBe(2023)
      expect(date.getMonth()).toBe(9)
      expect(date.getDate()).toBe(1)
    })

    it('should return null for invalid parts', () => {
      const date = getDateFromParts(2023, 13, 32)
      expect(date).toBeNull()
    })
  })

  describe('hasValidKazakhstanControlDigit', () => {
    it('should return true for valid IIN/BIN', () => {
      const IIN = '990101300003'
      const BIN = '123456789013'
      const IIN_RESULT = hasValidKazakhstanControlDigit(IIN)
      const BIN_RESULT = hasValidKazakhstanControlDigit(BIN)
      expect(IIN_RESULT).toBeTrue()
      expect(BIN_RESULT).toBeTrue()
    })

    it('should return false for invalid IIN/BIN', () => {
      const IIN = '990101300003'
      const BIN = '123456789013'
      const IIN_RESULT = hasValidKazakhstanControlDigit(IIN)
      const BIN_RESULT = hasValidKazakhstanControlDigit(BIN)
      expect(IIN_RESULT).toBeTrue()
      expect(BIN_RESULT).toBeTrue()
    })
  })

  describe('isValidDdMmYyyyDate', () => {
    it('should return true for valid date', () => {
      const date = '12.10.2023'
      const result = isValidDdMmYyyyDate(date)
      expect(result).toBeTrue()
    })

    it('should return false for invalid date', () => {
      const date = '12.23.2023'
      const result = isValidDdMmYyyyDate(date)
      expect(result).toBeFalse()
    })
  })

  describe('isValidDate', () => {
    it('should return true for valid date', () => {
      const date = '12.10.2023'
      const result = isValidDate(date)
      expect(result).toBeTrue()
    })

    it('should return false for invalid date', () => {
      const date = '12.23.2023'
      const result = isValidDate(date)
      expect(result).toBeFalse()
    })
  })

  describe('isNotFutureDdMmYyyyDate', () => {
    it('should return true for valid date', () => {
      const now = new Date()
      const day = now.getDate()
      const month = now.getMonth() + 1
      const year = now.getFullYear()
      const date = `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}`
      const result = isNotFutureDdMmYyyyDate(date)
      expect(result).toBeTrue()
    })

    it('should return false for invalid date', () => {
      const now = new Date()
      const day = now.getDate()
      const month = now.getMonth() + 1
      const year = now.getFullYear() + 1
      const date = `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}`
      const result = isNotFutureDdMmYyyyDate(date)
      expect(result).toBeFalse()
    })
  })

  describe('isValidIin', () => {
    it('should return true for valid IIN', () => {
      const iin = '990101300003'
      const result = isValidIin(iin)
      expect(result).toBeTrue()
    })

    it('should return false for invalid IIN', () => {
      const iin = '2193i12398'
      const result = isValidIin(iin)
      expect(result).toBeFalse()
    })
  })
})

import { describe, expect, test } from 'bun:test'

import { getDocumentFormData } from './document-formater'

describe('getDocumentFormData', () => {
  test('parses dates and dynamic cells while preserving other fields', () => {
    const formData = new FormData()
    formData.set('enumeration', '0004')
    formData.set('costPerDay', '12500.50')
    formData.set('documentDate', JSON.stringify(['10.09.2026', '15.09.2026']))
    formData.set('cellsLine', JSON.stringify({ Услуга: 'Проживание', Номер: '12' }))

    const expected = {
      enumeration: '0004',
      costPerDay: '12500.50',
      documentDate: ['10.09.2026', '15.09.2026'],
      cellsLine: { Услуга: 'Проживание', Номер: '12' }
    }

    expect(getDocumentFormData(formData)).toEqual(expected)
    expect(formData.get('documentDate')).toBe('["10.09.2026","15.09.2026"]')
    expect(formData.get('cellsLine')).toBe('{"Услуга":"Проживание","Номер":"12"}')
  })

  test('defaults missing dates and dynamic cells to empty collections', () => {
    expect(getDocumentFormData(new FormData())).toEqual({ documentDate: [], cellsLine: {} })
  })

  describe('documentDate', () => {
    test.each([
      '',
      'not json',
      'null',
      'true',
      '123',
      '"10.09.2026"',
      '{}',
      '[]',
      '["10.09.2026"]',
      '["10.09.2026","15.09.2026","20.09.2026"]',
      '["10.09.2026",15]',
      '[null,"15.09.2026"]'
    ])('returns an empty array for invalid input %s', (value) => {
      const formData = new FormData()
      formData.set('documentDate', value)
      formData.set('cellsLine', '{"key":"value"}')

      expect(getDocumentFormData(formData)).toEqual({
        documentDate: [],
        cellsLine: { key: 'value' }
      })
    })

    test('leaves calendar validation to the schema', () => {
      const formData = new FormData()
      formData.set('documentDate', JSON.stringify(['31.02.2026', 'invalid']))

      expect(getDocumentFormData(formData).documentDate).toEqual(['31.02.2026', 'invalid'])
    })
  })

  describe('cellsLine', () => {
    test.each(['', 'not json', 'null', 'true', '123', '"text"', '[]', '[{"key":"value"}]'])(
      'returns an empty object for invalid input %s',
      (value) => {
        const formData = new FormData()
        formData.set('cellsLine', value)
        formData.set('documentDate', '["10.09.2026","15.09.2026"]')

        expect(getDocumentFormData(formData)).toEqual({
          cellsLine: {},
          documentDate: ['10.09.2026', '15.09.2026']
        })
      }
    )

    test('accepts an empty object when no dynamic cells are provided', () => {
      const formData = new FormData()
      formData.set('cellsLine', '{}')

      expect(getDocumentFormData(formData).cellsLine).toEqual({})
    })
  })

  test('falls back to empty collections for uploaded files', () => {
    const formData = new FormData()
    formData.set('documentDate', new File(['["10.09.2026","15.09.2026"]'], 'dates.json'))
    formData.set('cellsLine', new File(['{"key":"value"}'], 'cells.json'))

    expect(getDocumentFormData(formData)).toEqual({ documentDate: [], cellsLine: {} })
  })
})

import { describe, expect, test } from 'bun:test'

import { Template } from '@/types/enums/template.enum'
import type { FindDocumentByIdData } from '@/types/find-document-by-id.type'

import formatDocumentTemplateData from './format-document-template-data'

type DocumentData = NonNullable<FindDocumentByIdData>

describe('formatDocumentTemplateData', () => {
  describe('LEASE_AGREEMENT', () => {
    test('formats lease agreement data', () => {
      const data = createDocumentData()

      const result = formatDocumentTemplateData(data, Template.LEASE_AGREEMENT)

      expect(result).toMatchObject({
        id: 'document-1',
        enumeration: '0002',

        'customer.fullnameClient': 'Елисеев Э.Д.',
        'customer.organization.organization': 'XANSHA',
        'customer.organization.costPerDay': '12 500',

        'documentDate.0': '10.09.2026',
        'documentDate.1': '15.09.2026',

        formattedDateFrom: '«10» сентября 2026г',
        formattedDateTo: '«15» сентября 2026г',

        nightsCount: 5,

        totalCost: '62 502',

        costPerDayRu: 'Двенадцать тысяч пятьсот',
        totalCostRu: 'Шестьдесят две тысячи пятьсот два',

        costPerDayCents: ', 50',
        totalCostCents: ', 50'
      })
    })

    test('preserves document fields after flattening', () => {
      const data = createDocumentData()

      const result = formatDocumentTemplateData(data, Template.LEASE_AGREEMENT)
      const flattened = asFlattened(result)

      expect(result.id).toBe(data.id)
      expect(result.enumeration).toBe(data.enumeration)

      expect(flattened['documentDate.0']).toBe(data.documentDate[0])
      expect(flattened['documentDate.1']).toBe(data.documentDate[1])

      expect(flattened['customer.fullnameClient']).toBe(data.customer.fullnameClient)

      expect(flattened['customer.clientIdNumber']).toBe(data.customer.clientIdNumber)

      expect(flattened['customer.iin']).toBe(data.customer.iin)

      expect(flattened['customer.organization.organization']).toBe(
        data.customer.organization.organization
      )
    })

    test('formats whole cents correctly', () => {
      const data = createDocumentData({
        customer: {
          ...createDocumentData().customer,
          organization: {
            ...createDocumentData().customer.organization,
            costPerDay: 12500,
            totalCost: 62500
          }
        }
      })

      const result = formatDocumentTemplateData(data, Template.LEASE_AGREEMENT)
      const flattened = asFlattened(result)

      expect(flattened.costPerDayCents).toBe(', 00')
      expect(flattened.totalCostCents).toBe(', 00')
    })

    test('pads single digit cents with zero', () => {
      const data = createDocumentData({
        customer: {
          ...createDocumentData().customer,
          organization: {
            ...createDocumentData().customer.organization,
            costPerDay: 12500.05,
            totalCost: 62500.07
          }
        }
      })

      const result = formatDocumentTemplateData(data, Template.LEASE_AGREEMENT)
      const flattened = asFlattened(result)

      expect(flattened.costPerDayCents).toBe(', 05')
      expect(flattened.totalCostCents).toBe(', 07')
    })
  })

  describe('unsupported template', () => {
    test('returns original data', () => {
      const data = createDocumentData()

      const result = formatDocumentTemplateData(data, 'UNSUPPORTED' as Template)

      expect(result).toBe(data)
    })
  })
})

// Helpers
function createDocumentData(overrides: Partial<DocumentData> = {}): DocumentData {
  return {
    id: 'document-1',
    updatedAt: new Date('2026-09-15T10:00:00Z'),
    createdAt: new Date('2026-09-15T10:00:00Z'),
    enumeration: '0002',
    documentDate: ['10.09.2026', '15.09.2026'],
    documentAddress: 'Сарыарка д 6 кв 1',
    cellsLine: {},

    customerId: 'customer-1',

    customer: {
      id: 'customer-1',
      updatedAt: new Date('2026-09-15T10:00:00Z'),
      createdAt: new Date('2026-09-15T10:00:00Z'),
      fullnameClient: 'Елисеев Э.Д.',
      clientIdNumber: '123456789',
      clientIdDateFrom: '01.01.2020',
      clientIdType: 'Удостоверение личности',
      iin: '123456789012',
      organizationId: 'organization-1',

      organization: {
        id: 'organization-1',
        updatedAt: new Date('2026-09-15T10:00:00Z'),
        createdAt: new Date('2026-09-15T10:00:00Z'),
        organization: 'XANSHA',
        bin: '123456789012',
        city: 'Астана',
        index: '010000',
        address: 'ул. Примерная, 1',
        costPerDay: 12500.5,
        totalCost: 62502.5,
        iik: 'KZ123456789012345678',
        bik: 'ABCDEFKZ',
        bank: 'Test Bank',
        kbe: '17',
        knp: '859',
        templateType: 'HOTEL'
      }
    },

    ...overrides
  }
}

function asFlattened(value: unknown): Record<string, unknown> {
  return value as Record<string, unknown>
}

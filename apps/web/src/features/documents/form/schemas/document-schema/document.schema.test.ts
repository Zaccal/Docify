import { expect, test } from 'bun:test'

import { fakerRU as faker } from '@faker-js/faker'

import { generateMockData } from '../../../../../../../../cypress/support/utils/generate-mock-data'
import { documentFormSchema } from './document.schema'

test('generated E2E form data passes document validation across seeded samples', () => {
  faker.seed(123)

  const today = new Date()
  const documentDate = [10, 15].map((day) =>
    new Date(today.getFullYear(), today.getMonth(), day).toLocaleDateString('ru-RU')
  )

  try {
    for (let sample = 0; sample < 1000; sample++) {
      const data = generateMockData()
      const result = documentFormSchema.safeParse({
        ...data,
        documentDate,
        iik: `KZ${data.iik}`,
        cellsLine: Object.fromEntries(data.dynamicCell.map(({ key, value }) => [key, value])),
        company: 'XANSHA',
        operationId: '00000000-0000-4000-8000-000000000000'
      })

      expect(
        result.error?.issues,
        `Validation errors in generated sample ${sample}`
      ).toBeUndefined()
    }
  } finally {
    faker.seed()
  }
})

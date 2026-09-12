import { fakerRU as faker } from '@faker-js/faker'

export interface CellItem {
  key: string
  value: string
}

export function generateDynamicCells(): CellItem[] {
  const pool: CellItem[] = [
    { key: 'КБЕ', value: faker.helpers.arrayElement(['17', '19', '14']) },
    { key: 'КНП', value: faker.helpers.arrayElement(['859', '841', '111']) },
    { key: 'ИИК (IBAN)', value: `KZ${faker.string.numeric(18)}` },
    { key: 'БИК', value: `KCKK${faker.string.numeric(4)}` },
    { key: 'Ставка НДС', value: '12%' },
    { key: 'Договор №', value: faker.string.numeric({ length: 5 }) }
  ]

  return faker.helpers.arrayElements(pool, 3)
}

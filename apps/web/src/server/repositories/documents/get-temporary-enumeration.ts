import type { TransactionType } from '@Docify/db'

import { findDocumentByEnumerationAndYear } from './check-enumeration-conflict/helpers/find-document-by-enumeration-and-year'

export async function getTemporaryEnumeration(tx: TransactionType, year: number): Promise<string> {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  for (let attempt = 0; attempt < 100; attempt++) {
    let value = '~'

    for (let i = 0; i < 3; i++) {
      value += chars[Math.floor(Math.random() * chars.length)]
    }

    const existing = await findDocumentByEnumerationAndYear(tx, value, year)

    if (!existing) {
      return value
    }
  }

  throw new Error('Не удалось создать временный порядковый номер')
}

import { describe, expect, test } from 'bun:test'
import { access } from 'node:fs/promises'
import path from 'node:path'

import { Template } from '@/types/enums/template.enum'

import { getTemplatePath } from './get-template-path'

const templateRoot = path.resolve(import.meta.dir, '../../../templates')

describe('getTemplatePath', () => {
  test.each([
    ['XANSHA', 'Караганда', 'APARTMENT', 'XANSHA/karaganda'],
    ['XANSHA', 'Караганда', 'HOTEL', 'XANSHA/karaganda/HOTEL'],
    ['XANSHA', 'Жанаарка', 'APARTMENT', 'XANSHA/zhanaarka'],
    ['XANSHA', 'Жанаарка', 'HOTEL', 'XANSHA/zhanaarka/HOTEL'],
    ['NomadDocs', 'Караганда', 'APARTMENT', 'NomadDocs'],
    ['NomadDocs', 'Жанаарка', 'APARTMENT', 'NomadDocs']
  ] as const)('finds the %s %s %s lease', async (company, pointOfSale, templateType, directory) => {
    const result = getTemplatePath(
      templateRoot,
      company,
      Template.LEASE_AGREEMENT,
      templateType,
      pointOfSale
    )

    expect(result).toBe(path.join(templateRoot, directory, 'Lease Agreement.docx'))
    await access(result)
  })

  test('defaults older documents to Zhanaarka', () => {
    expect(getTemplatePath(templateRoot, 'XANSHA', Template.LEASE_AGREEMENT)).toBe(
      path.join(templateRoot, 'XANSHA/zhanaarka/Lease Agreement.docx')
    )
  })
})

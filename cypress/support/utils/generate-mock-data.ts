import { fakerRU as faker } from '@faker-js/faker'

import { generateBIN } from './generate-BIN'
import { generateDynamicCells } from './generate-dynamic-cells'

const COMMON_KBE = ['17', '19', '14']
const COMMON_KNP = ['859', '841', '111', '851']
const COMMON_BANK = ['АО «Народный Банк Казахстана»', 'АО "Bank RBK"', 'АО "Forte Bank"']
const COMMON_CITIES = ['Астана', 'Алматы', 'Шымкент', 'Караганда', 'Актобе']

/**
 * Kazakhstan IIN checksum.
 *
 * IIN format:
 * YYMMDDCXXXXK
 *
 * YY   - year
 * MM   - month
 * DD   - day
 * C    - century/gender
 * XXXX - sequence
 * K    - control digit
 */
function calculateIINChecksum(first11: string): number {
  const weights1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  let sum = 0

  for (let i = 0; i < 11; i++) {
    sum += Number(first11[i]) * weights1[i]!
  }

  let checksum = sum % 11

  if (checksum !== 10) {
    return checksum
  }

  const weights2 = [3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2]

  sum = 0

  for (let i = 0; i < 11; i++) {
    sum += Number(first11[i]) * weights2[i]!
  }

  checksum = sum % 11

  return checksum
}

function generateIIN(birthDate: Date): string {
  const year = birthDate.getFullYear()

  const yy = String(year % 100).padStart(2, '0')
  const mm = String(birthDate.getMonth() + 1).padStart(2, '0')
  const dd = String(birthDate.getDate()).padStart(2, '0')

  let centuryGender: number

  if (year >= 2000) {
    centuryGender = faker.helpers.arrayElement([5, 6])
  } else {
    centuryGender = faker.helpers.arrayElement([3, 4])
  }

  const sequence = String(
    faker.number.int({
      min: 0,
      max: 9999
    })
  ).padStart(4, '0')

  const first11 = `${yy}${mm}${dd}${centuryGender}${sequence}`

  const checksum = calculateIINChecksum(first11)

  if (checksum === 10) {
    return generateIIN(birthDate)
  }

  return `${first11}${checksum}`
}

function generateBirthDateForDocument(documentDate: Date, minAge = 18, maxAge = 65): Date {
  const latestBirthDate = new Date(documentDate)
  latestBirthDate.setFullYear(latestBirthDate.getFullYear() - minAge)

  const earliestBirthDate = new Date(documentDate)
  earliestBirthDate.setFullYear(earliestBirthDate.getFullYear() - maxAge)

  return faker.date.between({
    from: earliestBirthDate,
    to: latestBirthDate
  })
}

export function generateMockData() {
  const firstName = faker.person.firstName('male')
  const lastName = faker.person.lastName('male')
  const middleName = faker.person.middleName('male')

  const fullnameClient = `${lastName} ${firstName[0]}.${middleName[0]}.`

  const documentDate = new Date(2024, 8, 26)
  const idGetDate = generateBirthDateForDocument(documentDate)
  const date = new Date()

  const formatted = date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long'
  })

  const month = formatted.split(' ')[1]
  const year = date.getFullYear()

  return {
    enumeration: faker.string.numeric({
      length: 4
    }),
    documentDate: `10 ${month} ${year} - 15 ${month} ${year}`,
    fullnameClient,
    clientIdNumber: faker.string.numeric({
      length: 9
    }),
    clientIdDateFrom: idGetDate.toLocaleDateString('ru-RU'),
    clientIdType: 'МВД РК',
    iin: generateIIN(idGetDate),
    costPerDay: String(
      faker.number.int({
        min: 15000,
        max: 50000
      })
    ),
    organization: `ТОО "${faker.company.name()}"`,
    bin: generateBIN(),
    city: faker.helpers.arrayElement(COMMON_CITIES),
    index: faker.location.zipCode('######'),
    address: faker.location.streetAddress().replace(/[()]/g, ''),
    kbe: faker.helpers.arrayElement(COMMON_KBE),
    knp: faker.helpers.arrayElement(COMMON_KNP),
    bank: faker.helpers.arrayElement(COMMON_BANK),
    iik: faker.string.numeric({
      length: 18
    }),
    bik: faker.string
      .alphanumeric({
        length: 8
      })
      .toUpperCase(),

    dynamicCell: generateDynamicCells()
  }
}

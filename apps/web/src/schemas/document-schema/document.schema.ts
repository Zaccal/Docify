import * as z from 'zod/mini'

const CYRILLIC_UPPER = 'А-ЯЁӘҒҚҢӨҰҮҺІ'
const CYRILLIC_LOWER = 'а-яёәғқңөұүһі'
const CYRILLIC = `${CYRILLIC_UPPER}${CYRILLIC_LOWER}`

const ENUMERATION_REGEX = new RegExp(`^[0-9A-Za-z${CYRILLIC}./-]+$`, 'u')
const FULLNAME_CLIENT_REGEX = new RegExp(
  `^[${CYRILLIC_UPPER}][${CYRILLIC_LOWER}]+(?:-[${CYRILLIC_UPPER}][${CYRILLIC_LOWER}]+)? [${CYRILLIC_UPPER}]\\.[${CYRILLIC_UPPER}]\\.$`,
  'u'
)
const ORGANIZATION_REGEX = new RegExp(`^[0-9A-Za-z${CYRILLIC}\\s"«».-]+$`, 'u')
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const COST_PER_DAY_REGEX = /^(?:\d+)(?:[.,]\d{1,2})?$/
const ADDRESS_REGEX = new RegExp(`^[0-9A-Za-z${CYRILLIC}\\s,./№-]+$`, 'u')
const CITY_REGEX = new RegExp(`^[A-Za-z${CYRILLIC}\\s-]+$`, 'u')
const BANK_NAME_REGEX = new RegExp(`^[0-9A-Za-z${CYRILLIC}\\s"«».-]+$`, 'u')
const IIN_OR_BIN_REGEX = /^\d{12}$/

function getDateFromParts(year: number, month: number, day: number) {
  const date = new Date(Date.UTC(year, month - 1, day))

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null
  }

  return date
}

function hasValidKazakhstanControlDigit(value: string): boolean {
  if (!IIN_OR_BIN_REGEX.test(value)) {
    return false
  }

  const digits = value.split('').map(Number)
  const getControlDigit = (weights: number[]) =>
    weights.reduce((sum, weight, index) => sum + digits[index] * weight, 0) % 11

  const firstWeights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  const secondWeights = [3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2]
  const firstControlDigit = getControlDigit(firstWeights)
  const controlDigit = firstControlDigit === 10 ? getControlDigit(secondWeights) : firstControlDigit

  return controlDigit !== 10 && controlDigit === digits[11]
}

export function isValidDate(value: string): boolean {
  if (!ISO_DATE_REGEX.test(value)) {
    return false
  }

  const [year, month, day] = value.split('-').map(Number)

  return !!getDateFromParts(year, month, day)
}

export function isNotFutureDate(value: string): boolean {
  if (!isValidDate(value)) {
    return false
  }

  const [year, month, day] = value.split('-').map(Number)
  const date = Date.UTC(year, month - 1, day)
  const now = new Date()
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())

  return date <= today
}

export function isValidIin(value: string): boolean {
  if (!IIN_OR_BIN_REGEX.test(value)) {
    return false
  }

  const yearPart = Number(value.slice(0, 2))
  const month = Number(value.slice(2, 4))
  const day = Number(value.slice(4, 6))
  const centuryDigit = Number(value[6])
  const centuryByDigit: Record<number, number> = {
    1: 1800,
    2: 1800,
    3: 1900,
    4: 1900,
    5: 2000,
    6: 2000
  }
  const century = centuryByDigit[centuryDigit]

  if (!century || !getDateFromParts(century + yearPart, month, day)) {
    return false
  }

  return hasValidKazakhstanControlDigit(value)
}

export function isValidBin(value: string): boolean {
  return hasValidKazakhstanControlDigit(value)
}

export const enumerationSchema = z
  .string('Номер/пункт документа должен быть строкой')
  .check(
    z.trim(),
    z.minLength(4, 'Длина должна быть не менее 4 символов'),
    z.regex(ENUMERATION_REGEX, 'Допустимы только цифры, буквы, дефис, слэш и точка')
  )

export const fullnameClientSchema = z
  .string('ФИО клиента должно быть строкой')
  .check(
    z.trim(),
    z.regex(
      FULLNAME_CLIENT_REGEX,
      'Укажите ФИО в формате "Иванов И.И."; фамилия и инициалы должны быть на кириллице'
    )
  )

export const organizationSchema = z
  .string('Организация должна быть строкой')
  .check(
    z.trim(),
    z.minLength(3, 'Название организации должно быть не менее 3 символов'),
    z.regex(
      ORGANIZATION_REGEX,
      'В названии организации допустимы буквы, цифры, кавычки, дефисы, пробелы и точки'
    )
  )

export const clientIdNumberSchema = z
  .string('Номер удостоверения должен быть строкой')
  .check(z.trim(), z.regex(/^\d{9}$/, 'Номер удостоверения личности РК должен состоять из 9 цифр'))

export const clientIdDateFromSchema = z
  .string('Дата выдачи удостоверения должна быть строкой')
  .check(
    z.trim(),
    z.regex(ISO_DATE_REGEX, 'Дата выдачи удостоверения должна быть в формате YYYY-MM-DD'),
    z.refine(isValidDate, 'Дата выдачи удостоверения должна быть корректной календарной датой'),
    z.refine(isNotFutureDate, 'Дата выдачи удостоверения не может быть в будущем')
  )

export const clientIdTypeSchema = z.enum(
  ['identity_card', 'passport', 'residence_permit'],
  'Выберите корректный тип документа: удостоверение личности, паспорт или вид на жительство'
)

export const costPerDaySchema = z.string('Стоимость за день должна быть строкой').check(
  z.trim(),
  z.minLength(1, 'Укажите стоимость за день'),
  z.regex(
    COST_PER_DAY_REGEX,
    'Стоимость должна быть положительным числом с максимум 2 знаками после точки или запятой'
  ),
  z.refine((value) => Number(value.replace(',', '.')) > 0, 'Стоимость должна быть больше 0')
)

export const documentDateSchema = z
  .string('Дата документа должна быть строкой')
  .check(
    z.trim(),
    z.regex(ISO_DATE_REGEX, 'Дата документа должна быть в формате YYYY-MM-DD'),
    z.refine(isValidDate, 'Дата документа должна быть корректной календарной датой'),
    z.refine(isNotFutureDate, 'Дата документа не может быть в будущем')
  )

export const binSchema = z
  .string('БИН должен быть строкой')
  .check(
    z.trim(),
    z.regex(/^\d{12}$/, 'БИН Казахстана должен состоять из 12 цифр'),
    z.refine(isValidBin, 'БИН Казахстана содержит некорректную контрольную цифру')
  )

export const iinSchema = z
  .string('ИИН должен быть строкой')
  .check(
    z.trim(),
    z.regex(/^\d{12}$/, 'ИИН Казахстана должен состоять из 12 цифр'),
    z.refine(isValidIin, 'ИИН Казахстана содержит некорректную дату рождения или контрольную цифру')
  )

export const addressSchema = z
  .string('Адрес должен быть строкой')
  .check(
    z.trim(),
    z.minLength(5, 'Адрес должен быть не менее 5 символов'),
    z.regex(
      ADDRESS_REGEX,
      'В адресе допустимы буквы, цифры, пробелы, запятые, точки, дефисы, слэши и №'
    )
  )

export const citySchema = z
  .string('Город должен быть строкой')
  .check(
    z.trim(),
    z.minLength(2, 'Название города должно быть не менее 2 символов'),
    z.regex(CITY_REGEX, 'Название города может содержать только буквы, пробелы и дефис')
  )

export const iikSchema = z
  .string('ИИК должен быть строкой')
  .check(
    z.trim(),
    z.toUpperCase(),
    z.regex(/^KZ[A-Z0-9]{18}$/, 'ИИК должен быть IBAN Казахстана: KZ и еще 18 букв или цифр')
  )

export const bikSchema = z
  .string('БИК должен быть строкой')
  .check(
    z.trim(),
    z.toUpperCase(),
    z.regex(/^[A-Z0-9]{8}$/, 'БИК банка должен состоять из 8 латинских букв или цифр')
  )

export const bankNameSchema = z
  .string('Название банка должно быть строкой')
  .check(
    z.trim(),
    z.minLength(3, 'Название банка должно быть не менее 3 символов'),
    z.regex(
      BANK_NAME_REGEX,
      'В названии банка допустимы буквы, цифры, кавычки, точки, дефисы и пробелы'
    )
  )

export const dynamicKeyValueSchema = z
  .record(
    z
      .string('Ключ строки должен быть строкой')
      .check(z.trim(), z.minLength(1, 'Ключ строки не может быть пустым')),
    z
      .string('Значение строки должно быть строкой')
      .check(z.trim(), z.minLength(1, 'Значение строки не может быть пустым'))
  )
  .check(z.refine((value) => Object.keys(value).length > 0, 'Добавьте минимум одну строку'))

export const indexSchema = z
  .string('Почтовый индекс должен быть строкой')
  .check(z.trim(), z.regex(/^\d{6}$/, 'Почтовый индекс Казахстана должен состоять из 6 цифр'))

export const documentFormSchema = z.object({
  enumeration: enumerationSchema,
  fullnameClient: fullnameClientSchema,
  organization: organizationSchema,
  clientIdNumber: clientIdNumberSchema,
  clientIdDateFrom: clientIdDateFromSchema,
  clientIdType: clientIdTypeSchema,
  costPerDay: costPerDaySchema,
  documentDate: documentDateSchema,
  bin: binSchema,
  iin: iinSchema,
  address: addressSchema,
  city: citySchema,
  iik: iikSchema,
  bik: bikSchema,
  bank: bankNameSchema,
  cellsLine: dynamicKeyValueSchema,
  index: indexSchema
})

export type DocumentFormSchema = z.infer<typeof documentFormSchema>

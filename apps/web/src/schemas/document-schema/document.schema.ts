import * as z from 'zod/mini'

import {
  ADDRESS_REGEX,
  CITY_REGEX,
  COST_PER_DAY_REGEX,
  DD_MM_YYYY_DATE_REGEX,
  ENUMERATION_REGEX,
  FULLNAME_CLIENT_REGEX,
  ISO_DATE_REGEX,
  ORGANIZATION_REGEX
} from '@/lib/constants'
import type { FieldError } from '@/types/field-error'
import {
  isNotFutureDate,
  isNotFutureDdMmYyyyDate,
  isValidBin,
  isValidDate,
  isValidDdMmYyyyDate,
  isValidIin
} from '@/utils/document-validation'

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
  .check(z.trim(), z.length(9, 'Номер удостоверения личности РК должен состоять из 9 цифр'))

export const clientIdDateFromSchema = z
  .string('Дата выдачи удостоверения должна быть строкой')
  .check(
    z.trim(),
    z.regex(DD_MM_YYYY_DATE_REGEX, 'Дата выдачи удостоверения должна быть в формате DD.MM.YYYY'),
    z.refine(
      isValidDdMmYyyyDate,
      'Дата выдачи удостоверения должна быть корректной календарной датой'
    ),
    z.refine(isNotFutureDdMmYyyyDate, 'Дата выдачи удостоверения не может быть в будущем')
  )

export const clientIdTypeSchema = z
  .string()
  .check(z.minLength(2, 'Тип документа должен быть строкой и содержать минимум 2 символа'))

export const costPerDaySchema = z.string('Стоимость за день должна быть строкой').check(
  z.trim(),
  z.minLength(1, 'Укажите стоимость за день'),
  z.regex(
    COST_PER_DAY_REGEX,
    'Стоимость должна быть положительным числом с максимум 2 знаками после точки или запятой'
  ),
  z.refine((value) => Number(value.replace(',', '.')) > 0, 'Стоимость должна быть больше 0')
)

const documentDateItemSchema = z
  .string('Дата документа должна быть строкой')
  .check(
    z.trim(),
    z.regex(ISO_DATE_REGEX, 'Дата документа должна быть в формате YYYY-MM-DD'),
    z.refine(isValidDate, 'Дата документа должна быть корректной календарной датой'),
    z.refine(isNotFutureDate, 'Дата документа не может быть в будущем')
  )

export const documentDateSchema = z
  .tuple([documentDateItemSchema, documentDateItemSchema])
  .check(
    z.refine(
      ([from, to]) => Date.parse(from) <= Date.parse(to),
      'Дата начала периода не может быть позже даты окончания'
    )
  )

export const binSchema = z
  .string('БИН должен быть строкой')
  .check(
    z.trim(),
    z.length(12, 'БИН Казахстана должен состоять из 12 цифр'),
    z.refine(isValidBin, 'БИН Казахстана содержит некорректную контрольную цифру')
  )

export const iinSchema = z
  .string('ИИН должен быть строкой')
  .check(
    z.trim(),
    z.length(12, 'ИИН Казахстана должен состоять из 12 цифр'),
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
    z.length(8, 'БИК банка должен состоять из 8 латинских букв или цифр')
  )

export const bankNameSchema = z
  .string('Название банка должно быть строкой')
  .check(z.trim(), z.minLength(3, 'Название банка должно быть не менее 3 символов'))

export const dynamicKeyValueSchema = z.optional(
  z.record(
    z
      .string('Ключ строки должен быть строкой')
      .check(z.trim(), z.minLength(1, 'Ключ строки не может быть пустым')),
    z
      .string('Значение строки должно быть строкой')
      .check(z.trim(), z.minLength(1, 'Значение строки не может быть пустым'))
  )
)

export const indexSchema = z
  .string('Почтовый индекс должен быть строкой')
  .check(z.trim(), z.length(6, 'Почтовый индекс Казахстана должен состоять из 6 цифр'))

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
type FieldNames = keyof DocumentFormSchema
export type DocumentFormError = Partial<Record<FieldNames, FieldError[]>>

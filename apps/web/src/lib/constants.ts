import {
  DocumentAttachmentIcon,
  HistoryIcon,
  Home01Icon,
  PlusSignSquareIcon,
  User02Icon
} from '@hugeicons/core-free-icons'

import type { DocumentAction } from '@/types/document-action.type'
import type { SidebarItem } from '@/types/sidebar-items.type'

export const COOKIE_NAME = 'auth'

export const PUBLIC_ROUTES = ['/']

export const CYRILLIC_UPPER = 'А-ЯЁӘҒҚҢӨҰҮҺІ'
export const CYRILLIC_LOWER = 'а-яёәғқңөұүһі'
export const CYRILLIC = `${CYRILLIC_UPPER}${CYRILLIC_LOWER}`

export const ENUMERATION_REGEX = new RegExp(`^[0-9A-Za-z${CYRILLIC}./-]+$`, 'u')
export const FULLNAME_CLIENT_REGEX = new RegExp(
  `^[${CYRILLIC_UPPER}][${CYRILLIC_LOWER}]+(?:-[${CYRILLIC_UPPER}][${CYRILLIC_LOWER}]+)? [${CYRILLIC_UPPER}]\\.[${CYRILLIC_UPPER}]\\.$`,
  'u'
)
export const DD_MM_YYYY_DATE_REGEX = /^\d{2}\.\d{2}\.\d{4}$/
export const COST_PER_DAY_REGEX = /^(?:\d+)(?:[.,]\d{1,2})?$/
export const ADDRESS_REGEX = new RegExp(`^[0-9A-Za-z${CYRILLIC}\\s,./№-]+$`, 'u')
export const CITY_REGEX = new RegExp(`^[A-Za-z${CYRILLIC}\\s-]+$`, 'u')
export const IIN_OR_BIN_REGEX = /^\d{12}$/

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: 'Главная',
    icon: Home01Icon,
    href: '/dashboard'
  },
  {
    label: 'Операции',
    icon: HistoryIcon,
    href: '/transactions'
  },
  {
    label: 'Документы',
    icon: DocumentAttachmentIcon,
    href: '/documents'
  },
  {
    label: 'Клиенты',
    icon: User02Icon,
    href: '/customers'
  }
]

export const SIDEBAR_ITEMS_DOCUMENTS: SidebarItem[] = [
  {
    label: 'Создать документ',
    icon: PlusSignSquareIcon,
    href: '/create-document'
  }
]

export const UNIQUE_CONSTRAINT_MESSAGES: Record<string, string> = {
  organizations_table_organization_unique: 'Организация с таким названием уже существует',
  organizations_table_bin_unique: 'Организация с таким БИН уже существует',
  customers_table_fullname_client_unique: 'Клиент с таким полным именем уже существует',
  customers_table_client_id_number_unique: 'Клиент с таким номером удостоверения уже существует',
  customers_table_iin_unique: 'Клиент с таким ИИН уже существует'
}

export const ONES = [
  '',
  'один',
  'два',
  'три',
  'четыре',
  'пять',
  'шесть',
  'семь',
  'восемь',
  'девять'
]

export const ONES_FEMALE = [
  '',
  'одна',
  'две',
  'три',
  'четыре',
  'пять',
  'шесть',
  'семь',
  'восемь',
  'девять'
]

export const TEENS = [
  'десять',
  'одиннадцать',
  'двенадцать',
  'тринадцать',
  'четырнадцать',
  'пятнадцать',
  'шестнадцать',
  'семнадцать',
  'восемнадцать',
  'девятнадцать'
]

export const TENS = [
  '',
  '',
  'двадцать',
  'тридцать',
  'сорок',
  'пятьдесят',
  'шестьдесят',
  'семьдесят',
  'восемьдесят',
  'девяносто'
]

export const HUNDREDS = [
  '',
  'сто',
  'двести',
  'триста',
  'четыреста',
  'пятьсот',
  'шестьсот',
  'семьсот',
  'восемьсот',
  'девятьсот'
]

export const DEFAULT_TEMPLATE_TYPE = 'APARTMENT'
export const DEFAULT_COMPANY_TYPE = 'XANSHA'

export const ACTIONS: Array<{
  value: DocumentAction
  title: string
  description: string
}> = [
  {
    value: 'NEW_ORDER',
    title: 'Новый документ',
    description: 'Обновите документы и добавьте новый платеж.'
  },
  {
    value: 'CORRECTION',
    title: 'Исправить ошибку',
    description: 'Замените предыдущее списание на новое.'
  },
  {
    value: 'REGENERATE',
    title: 'Восстановить документ',
    description: 'Повторите генерацию без финансового учета.'
  },
  {
    value: 'CANCEL',
    title: 'Возврат документа',
    description: 'Отмените предыдущее списание.'
  }
]

export const COMPANY_LOCAL_STORAGE_KEY = 'company' as const

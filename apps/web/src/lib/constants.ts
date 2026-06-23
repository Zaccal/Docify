import { DocumentAttachmentIcon, Home01Icon, User02Icon } from '@hugeicons/core-free-icons'

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
export const ORGANIZATION_REGEX = new RegExp(`^[0-9A-Za-z${CYRILLIC}\\s"«».-]+$`, 'u')
export const ISO_DATE_REGEX = /^\d{2}\.\d{2}\.\d{4}$/
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

export const welcomeDescriptions = [
  'Все ваши документы и клиенты в одном месте.',
  'Создавайте документы за минуты, а не часы.',
  'Управляйте документами и клиентами легко и быстро.',
  'Управляйте клиентами, шаблонами и документами без лишней рутины.',
  'Меньше ручной работы — больше времени на важное.',
  'Заполняйте данные один раз. Остальное система сделает сама.',
  'Создавайте договоры и документы за несколько кликов.',
  'Все шаблоны, клиенты и документы под рукой.',
  'Время деньги',
  'Мы автоматизировали документы, чтобы вам не пришлось копировать одни и те же данные в четвёртый раз.',
  'Спасаем людей от Excel-таблиц и бесконечного Ctrl+C → Ctrl+V с 2025 года.',
  'Заполните данные один раз. Почувствуйте себя программистом, автоматизировавшим работу бухгалтера.',
  'Система была создана после того, как кто-то в очередной раз ошибся в номере договора.',
  'Генерируем документы быстрее, чем вы успеете спросить: «А где прошлый клиент?»',
  'Потому что жизнь слишком коротка, чтобы вручную заполнять четыре одинаковых документа.',
  'Нажмите одну кнопку. Сделайте вид, что работали весь день.',
  'Превращаем 15 минут рутины в 15 секунд автоматизации.',
  'Потому что рутины — это время, которое можно посвятить более важным задачам.',
  'Ваш персональный сотрудник по копированию данных. Не жалуется, не уходит в отпуск.',
  'Создано для людей, которым надоело каждый раз перепечатывать одни и те же данные и надеяться, что ошибок нет.',
  'Если документ заполнился сам — это не магия, это Адиль наконец-то автоматизировал процесс.',
  'Мама, сегодня без ошибок в договорах, пожалуйста 😄'
]

export const CARD_HEADER_COLORS = {
  blue: 'bg-blue-100 text-blue-400',
  green: 'bg-green-100 text-green-400',
  orange: 'bg-orange-100 text-orange-400',
  purple: 'bg-purple-100 text-purple-400',
  red: 'bg-red-100 text-red-400',
  gray: 'bg-gray-100 text-gray-400'
} as const

export const UNIQUE_CONSTRAINT_MESSAGES: Record<string, string> = {
  organizations_table_organization_unique: 'Организация с таким названием уже существует',
  organizations_table_bin_unique: 'Организация с таким БИН уже существует',
  customers_table_fullname_client_unique: 'Клиент с таким полным именем уже существует',
  customers_table_client_id_number_unique: 'Клиент с таким номером удостоверения уже существует',
  customers_table_iin_unique: 'Клиент с таким ИИН уже существует'
}

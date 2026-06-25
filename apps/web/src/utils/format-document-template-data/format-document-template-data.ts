import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { flattenObject } from 'es-toolkit'

import { Template } from '@/types/enums/template.enum'
import type { FindDocumentByIdData } from '@/types/find-document-by-id.type'

import { formatCost } from '../cost-format'
import { getNightsCount } from './subutils/get-nights-count'
import { numberToWordsRu } from './subutils/numbers-to-words-ru'
import { parseDocumentDateRange } from './subutils/parse-document-date-range'

export default function formatDocumentTemplateData(
  data: NonNullable<FindDocumentByIdData>,
  template: Template
) {
  switch (template) {
    case Template.LEASE_AGREEMENT:
      return formatLeaseAgreement(data)
    default:
      return data
  }
}

function formatLeaseAgreement(data: NonNullable<FindDocumentByIdData>) {
  const [dateFrom, dateTo] = parseDocumentDateRange(data.documentDate)

  const formattedDateFrom = format(dateFrom, '«dd» MMMM yyyyг', {
    locale: ru
  })
  const formattedDateTo = format(dateTo, '«dd» MMMM yyyyг', {
    locale: ru
  })

  const totalPrice = Number(data.organization.costPerDay) * getNightsCount(dateFrom, dateTo)

  const costPerDayRu = numberToWordsRu(Number(data.organization.costPerDay))

  return flattenObject({
    ...data,
    organization: {
      ...data.organization,
      costPerDay: formatCost(data.organization.costPerDay)
    },
    formattedDateFrom,
    formattedDateTo,
    totalPrice: formatCost(String(totalPrice)),
    totalPriceRu: numberToWordsRu(totalPrice),
    costPerDayRu
  })
}

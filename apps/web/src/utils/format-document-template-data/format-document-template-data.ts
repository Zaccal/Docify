import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { flattenObject } from 'es-toolkit'

import { Template } from '@/types/enums/template.enum'
import type { FindDocumentByIdData } from '@/types/find-document-by-id.type'

import { formatNumber } from '../format-number'
import { getNightsCount } from './subutils/get-nights-count'
import { numberToWordsRu } from './subutils/numbers-to-words-ru'
import { parseDocumentDateRange } from './subutils/parse-document-date-range'

// TODO: Remove Template type and switch
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
  const formatedCostPerDay = Number(
    String(data.customer.organization.costPerDay).replace('.', ',').split(',')[0]
  )
  const formatedTotalCost = Number(
    String(data.customer.organization.totalCost).replace('.', ',').split(',')[0]
  )

  const centsPerDay = Number(
    String(data.customer.organization.costPerDay).replace('.', ',').split(',')[1]
  )
  const centsTotalCost = Number(
    String(data.customer.organization.totalCost).replace('.', ',').split(',')[1]
  )

  const [dateFrom, dateTo] = parseDocumentDateRange(data.documentDate)

  const formattedDateFrom = format(dateFrom, '«dd» MMMM yyyyг', {
    locale: ru
  })
  const formattedDateTo = format(dateTo, '«dd» MMMM yyyyг', {
    locale: ru
  })

  const nights = getNightsCount(dateFrom, dateTo)

  const costPerDayRu = numberToWordsRu(formatedCostPerDay)
  const totalCostRu = numberToWordsRu(formatedTotalCost)

  return flattenObject({
    ...data,
    customer: {
      ...data.customer,
      organization: {
        ...data.customer.organization,
        costPerDay: formatNumber(formatedCostPerDay)
      }
    },
    formattedDateFrom,
    formattedDateTo,
    totalCost: formatNumber(formatedTotalCost),
    totalCostRu,
    costPerDayRu,
    nightsCount: nights,
    costPerDayCents: centsPerDay ? `, ${centsPerDay}` : ', 00',
    totalCostCents: centsTotalCost ? `, ${centsTotalCost}` : ', 00'
  })
}

import type { SearchResultDocument } from '@/types/search-state.type'

import type { DocumentValues } from '../form/types/document-state.type'

export function documentToFormValues(document: SearchResultDocument): DocumentValues {
  const { customer } = document

  return {
    enumeration: document.enumeration,
    documentDate:
      document.documentDate?.length === 2
        ? [document.documentDate[0], document.documentDate[1]]
        : undefined,
    cellsLine: document.cellsLine,

    fullnameClient: customer.fullnameClient,
    clientIdNumber: customer.clientIdNumber,
    clientIdDateFrom: customer.clientIdDateFrom,
    clientIdType: customer.clientIdType,
    iin: customer.iin,

    organization: customer.organization.organization,
    bin: customer.organization.bin,
    city: customer.organization.city,
    index: customer.organization.index,
    address: customer.organization.address,
    costPerDay: customer.organization.costPerDay,
    iik: customer.organization.iik,
    bik: customer.organization.bik,
    bank: customer.organization.bank,
    knp: customer.organization.knp ?? '',
    kbe: customer.organization.kbe ?? ''
  }
}

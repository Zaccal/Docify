import type { CreateDocumentValues } from '@/types/create-document-state.type'
import type { SearchResultDocument } from '@/types/search-state.type'

export function documentToFormValues(document: SearchResultDocument): CreateDocumentValues {
  const { customer, organization } = document

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

    organization: organization.organization,
    bin: organization.bin,
    city: organization.city,
    index: organization.index,
    address: organization.address,
    costPerDay: organization.costPerDay,
    iik: organization.iik,
    bik: organization.bik,
    bank: organization.bank
  }
}

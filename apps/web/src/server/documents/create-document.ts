import { db, eq } from '@Docify/db'
import { CustomersTable, DocumentsTable, OrganizationsTable } from '@Docify/db/schema'

import type { DocumentFormSchema } from '@/schemas/document-schema/document.schema'
import { getNightsCount } from '@/utils/format-document-template-data/subutils/get-nights-count'

export async function createDocumentController(data: DocumentFormSchema) {
  const nights = getNightsCount(data.documentDate[0], data.documentDate[1])
  const totalCost = nights * data.costPerDay

  return db.transaction(async (tx) => {
    const organizationValues = {
      organization: data.organization,
      address: data.address,
      bank: data.bank,
      bik: data.bik,
      index: data.index,
      bin: data.bin,
      city: data.city,
      costPerDay: data.costPerDay,
      totalCost,
      iik: data.iik,
      kbe: data.kbe,
      knp: data.knp ?? ''
    }

    let [organization] = await tx
      .insert(OrganizationsTable)
      .values(organizationValues)
      .onConflictDoUpdate({ target: OrganizationsTable.bin, set: organizationValues })
      .returning()

    if (!organization) {
      ;[organization] = await tx
        .select()
        .from(OrganizationsTable)
        .where(eq(OrganizationsTable.bin, data.bin))
        .limit(1)
    }

    if (!organization) {
      throw new Error('Не удалось создать или найти организацию')
    }

    const customerValues = {
      fullnameClient: data.fullnameClient,
      clientIdNumber: data.clientIdNumber,
      clientIdDateFrom: data.clientIdDateFrom,
      clientIdType: data.clientIdType,
      iin: data.iin,
      organizationId: organization.id
    }

    const [customer] = await tx
      .insert(CustomersTable)
      .values(customerValues)
      .onConflictDoUpdate({
        target: CustomersTable.iin,
        set: customerValues
      })
      .returning()

    if (!customer) {
      throw new Error('Не удалось создать или найти клиента')
    }

    const documentValues = {
      enumeration: data.enumeration,
      documentDate: data.documentDate,
      cellsLine: data.cellsLine ?? {},
      customerId: customer.id,
      organizationId: organization.id
    }

    const [document] = await tx
      .insert(DocumentsTable)
      .values(documentValues)
      .onConflictDoUpdate({
        target: DocumentsTable.customerId,
        set: {
          enumeration: data.enumeration,
          documentDate: data.documentDate,
          cellsLine: data.cellsLine ?? {},
          organizationId: organization.id,
          updatedAt: new Date()
        }
      })
      .returning()

    if (!document) {
      throw new Error('Не удалось создать или обновить документ')
    }

    return document
  })
}

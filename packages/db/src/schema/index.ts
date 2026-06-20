import { relations } from 'drizzle-orm'
import { pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core'

export const OrganizationsTable = pgTable('organizations_table', {
  id: uuid('id').primaryKey().defaultRandom(),
  organization: varchar('organization').notNull(),
  bin: varchar('bin', { length: 12 }).notNull(),
  city: text('city').notNull(),
  index: text('index').notNull(),
  address: text('address').notNull(),
  costPerDay: text('cost_per_day').notNull(),
  iik: varchar('iik', { length: 18 }).notNull(),
  bik: varchar('bik', { length: 9 }).notNull(),
  bank: text('bank').notNull()
})

export const CustomersTable = pgTable('customers_table', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullnameClient: varchar('fullname_client', { length: 255 }).notNull(),
  clientIdNumber: varchar('client_id_number', { length: 9 }).notNull(),
  clientIdDateFrom: text('client_id_date_from').notNull(),
  clientIdType: text('client_id_type').notNull(),
  iin: varchar('iin', { length: 12 }).notNull(),

  organizationId: uuid('organization_id')
    .references(() => OrganizationsTable.id)
    .notNull()
})

export const DocumentsTable = pgTable('documents_table', {
  id: uuid('id').primaryKey().defaultRandom(),
  enumeration: varchar('enumeration', { length: 4 }).notNull(),
  documentDate: text('document_date').array(),
  cellsLine: text('cells_line').notNull(),

  customerId: uuid('customer_id')
    .references(() => CustomersTable.id)
    .notNull(),
  organizationId: uuid('organization_id')
    .references(() => OrganizationsTable.id)
    .notNull()
})

export const organizationRelations = relations(OrganizationsTable, ({ many }) => ({
  customers: many(CustomersTable)
}))

export const customerRelations = relations(CustomersTable, ({ one }) => ({
  organization: one(OrganizationsTable, {
    fields: [CustomersTable.organizationId],
    references: [OrganizationsTable.id]
  })
}))

export const documentRelations = relations(DocumentsTable, ({ one }) => ({
  customer: one(CustomersTable, {
    fields: [DocumentsTable.customerId],
    references: [CustomersTable.id]
  }),
  document: one(OrganizationsTable, {
    fields: [DocumentsTable.organizationId],
    references: [OrganizationsTable.id]
  })
}))

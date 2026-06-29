import { relations } from 'drizzle-orm'
import { index, jsonb, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const OrganizationsTable = pgTable(
  'organizations_table',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    organization: text('organization').notNull().unique(),
    bin: varchar('bin', { length: 12 }).notNull().unique(),
    city: text('city').notNull(),
    index: text('index').notNull(),
    address: text('address').notNull(),
    costPerDay: text('cost_per_day').notNull(),
    iik: varchar('iik', { length: 20 }).notNull(),
    bik: varchar('bik', { length: 8 }).notNull(),
    bank: text('bank').notNull(),
    kbe: varchar('kbe', { length: 2 }).notNull(),
    knp: varchar('knp', { length: 3 })
  },
  (table) => [
    index('organizations_table_organization_idx').on(table.organization),
    index('organizations_table_bin_idx').on(table.bin)
  ]
)

export const CustomersTable = pgTable(
  'customers_table',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    fullnameClient: varchar('fullname_client', { length: 255 }).notNull(),
    clientIdNumber: varchar('client_id_number', { length: 9 }).notNull(),
    clientIdDateFrom: text('client_id_date_from').notNull(),
    clientIdType: text('client_id_type').notNull(),
    iin: varchar('iin', { length: 12 }).notNull().unique(),

    organizationId: uuid('organization_id')
      .references(() => OrganizationsTable.id, { onDelete: 'cascade' })
      .notNull()
  },
  (table) => [
    index('customers_table_fullname_client_idx').on(table.fullnameClient),
    index('customers_table_client_id_number_idx').on(table.clientIdNumber),
    index('customers_table_iin_idx').on(table.iin)
  ]
)

export const DocumentsTable = pgTable(
  'documents_table',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    enumeration: varchar('enumeration', { length: 4 }).notNull().unique(),
    documentDate: text('document_date').array().notNull(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    cellsLine: jsonb('cells_line').$type<Record<string, string>>().notNull(),

    customerId: uuid('customer_id')
      .references(() => CustomersTable.id, { onDelete: 'cascade' })
      .unique()
      .notNull(),
    organizationId: uuid('organization_id')
      .references(() => OrganizationsTable.id, { onDelete: 'cascade' })
      .notNull()
  },
  (table) => [
    index('documents_table_customer_id_idx').on(table.customerId),
    index('documents_table_organization_id_idx').on(table.organizationId),
    index('documents_table_enumeration_idx').on(table.enumeration)
  ]
)

export const organizationRelations = relations(OrganizationsTable, ({ many }) => ({
  customers: many(CustomersTable),
  documents: many(DocumentsTable)
}))

export const customerRelations = relations(CustomersTable, ({ one }) => ({
  organization: one(OrganizationsTable, {
    fields: [CustomersTable.organizationId],
    references: [OrganizationsTable.id]
  }),
  documents: one(DocumentsTable)
}))

export const documentRelations = relations(DocumentsTable, ({ one }) => ({
  customer: one(CustomersTable, {
    fields: [DocumentsTable.customerId],
    references: [CustomersTable.id]
  }),
  organization: one(OrganizationsTable, {
    fields: [DocumentsTable.organizationId],
    references: [OrganizationsTable.id]
  })
}))

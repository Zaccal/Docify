import { pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core'

export const DocumentsTable = pgTable('documents_table', {
  id: uuid('id').primaryKey().defaultRandom(),
  enumeration: varchar('enumeration', { length: 4 }).notNull(),
  fullnameClient: varchar('fullname_client', { length: 255 }).notNull(),
  organization: varchar('organization').notNull(),
  clientIdNumber: varchar('client_id_number', { length: 9 }).notNull(),
  clientIdDateFrom: text('client_id_date_from').notNull(),
  clientIdType: text('client_id_type').notNull(),
  costPerDay: text('cost_per_day').notNull(),
  documentDate: text('document_date').array(),
  bin: varchar('bin', { length: 12 }).notNull(),
  iin: varchar('iin', { length: 12 }).notNull(),
  address: text('address').notNull(),
  city: text('city').notNull(),
  iik: varchar('iik', { length: 18 }).notNull(),
  bik: varchar('bik', { length: 9 }).notNull(),
  bank: text('bank').notNull(),
  cellsLine: text('cells_line').notNull(),
  index: text('index').notNull()
})

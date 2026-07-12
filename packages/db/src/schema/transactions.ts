import { relations, sql } from 'drizzle-orm'
import {
  index,
  pgTable,
  uuid,
  numeric,
  timestamp,
  jsonb,
  type AnyPgColumn,
  check
} from 'drizzle-orm/pg-core'

import { DocumentsTable } from '.'
import type { TransactionSnapshot } from '../types/transaction-snapshot.type'
import {
  CostTransactionReasonEnum,
  CostTransactionStatusEnum,
  CostTransactionTypeEnum,
  OrganizationEnum
} from './enums'

export const CostTransactionsTable = pgTable(
  'cost_transactions_table',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    documentId: uuid('document_id').references(() => DocumentsTable.id, { onDelete: 'set null' }),
    amount: numeric('amount', {
      precision: 12,
      scale: 2,
      mode: 'number'
    }).notNull(),
    operationId: uuid('operation_id').notNull(),
    transactionDate: timestamp('transaction_date').notNull().defaultNow(),
    ip: OrganizationEnum('ip').default('XANSHA').notNull(),
    type: CostTransactionTypeEnum('type').default('CHARGE').notNull(),
    reason: CostTransactionReasonEnum('reason').default('NEW_ORDER').notNull(),
    status: CostTransactionStatusEnum('status').default('POSTED').notNull(),
    reversesTransactionId: uuid('reverses_transaction_id').references(
      (): AnyPgColumn => CostTransactionsTable.id,
      { onDelete: 'restrict' }
    ),
    snapshot: jsonb('snapshot').$type<TransactionSnapshot>().notNull()
  },
  (table) => [
    index(`cost_transactions_table_document_transaction_date_idx`).on(table.transactionDate),
    index('cost_transactions_table_document_id_idx').on(table.documentId),
    index('cost_transactions_table_amount_idx').on(table.amount),
    index('cost_transactions_table_ip_idx').on(table.ip),
    index('cost_transactions_table_type_idx').on(table.type),
    index('cost_transactions_table_reason_idx').on(table.reason),
    index('cost_transactions_table_status_idx').on(table.status),
    check(
      'cost_transactions_amount_sign_check',
      sql`
        (
          ${table.type} = 'CHARGE'
          AND ${table.amount} > 0
        )
        OR
        (
          ${table.type} = 'REVERSAL'
          AND ${table.amount} < 0
        )
      `
    )
  ]
)

export const costTransactionsRelations = relations(CostTransactionsTable, ({ one }) => ({
  documentsTable: one(DocumentsTable, {
    fields: [CostTransactionsTable.documentId],
    references: [DocumentsTable.id]
  })
}))

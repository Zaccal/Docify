import { pgEnum } from 'drizzle-orm/pg-core'

export const CompanyEnum = pgEnum('company', ['XANSHA', 'NomadDocs'])

export const CostTransactionTypeEnum = pgEnum('cost_transaction_type', ['CHARGE', 'REVERSAL'])

export const CostTransactionReasonEnum = pgEnum('cost_transaction_reason', [
  'NEW_ORDER',
  'REFUND_CANCELLATION',
  'CANCELLATION',
  'REFUND'
])

export const CostTransactionStatusEnum = pgEnum('cost_transaction_status', ['POSTED', 'VOID'])

export const TemplateType = pgEnum('template_type', ['HOTEL', 'APARTMENT'])

// Default: Сарыарка д 6 кв 1
export const DocumentAddressEnum = pgEnum('document_address', [
  'Сарыарка д 6 кв 1',
  'Сарыарка д 6 кв 4',
  'Сарыарка 6 кв 12',
  'Сарыарка д 14 кв 9',
  'Сарыарка д 1 кв 7',
  'Сарыарка д 1 кв 5'
])

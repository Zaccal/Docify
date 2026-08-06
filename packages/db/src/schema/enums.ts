import { pgEnum } from 'drizzle-orm/pg-core'

export const CompanyEnum = pgEnum('company', ['XANSHA', 'NomadDocs'])

export const CostTransactionTypeEnum = pgEnum('cost_transaction_type', ['CHARGE', 'REVERSAL'])

export const CostTransactionReasonEnum = pgEnum('cost_transaction_reason', [
  'NEW_ORDER',
  'CANCELLATION',
  'REFUND'
])

export const CostTransactionStatusEnum = pgEnum('cost_transaction_status', ['POSTED', 'VOID'])

export const TemplateType = pgEnum('template_type', ['HOTEL', 'APARTMENT'])

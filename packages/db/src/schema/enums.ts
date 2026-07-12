import { pgEnum } from 'drizzle-orm/pg-core'

export const OrganizationEnum = pgEnum('organization', ['XANSHA', 'NomadDocs'])

export const CostTransactionTypeEnum = pgEnum('cost_transaction_type', ['CHARGE', 'REVERSAL'])

export const CostTransactionReasonEnum = pgEnum('cost_transaction_reason', [
  'NEW_ORDER',
  'CORRECTION',
  'CANCELLATION'
])

export const CostTransactionStatusEnum = pgEnum('cost_transaction_status', ['POSTED', 'VOID'])

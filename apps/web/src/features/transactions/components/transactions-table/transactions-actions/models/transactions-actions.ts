export type TransactionActionId = 'view' | 'refund' | 'edit' | 'recreate' | 'cancel'

export interface TransactionAction {
  id: TransactionActionId
  label: string
  href?: string
  requiresConfirmation?: boolean
  disabled?: boolean
  disabledReason?: string
  showCondition?: boolean
}

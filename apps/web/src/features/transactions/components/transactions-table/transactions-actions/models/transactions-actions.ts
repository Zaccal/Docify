export type TransactionActionId = 'view' | 'refund' | 'edit' | 'recreate' | 'cancel' | 'ignore'

export interface TransactionAction {
  id: TransactionActionId
  label: string
  href?: string
  requiresConfirmation?: boolean
  disabled?: boolean
  disabledReason?: string
  showCondition?: boolean
}

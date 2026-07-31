export type TransactionActionId = 'view' | 'return' | 'edit' | 'recreate'

export interface TransactionAction {
  id: TransactionActionId
  label: string
  href?: string
  requiresConfirmation?: boolean
  disabled?: boolean
  disabledReason?: string
}

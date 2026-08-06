import type { Transactions } from '@/server/repositories/transactions/get-all-transactions'

import type { TransactionAction } from './transactions-actions'

interface GetTransactionActionsOptions {
  canEdit: boolean
  canReturn: boolean
  canRecreate: boolean
}

export function getTransactionActions(
  transaction: Transactions,
  permissions: GetTransactionActionsOptions
): TransactionAction[] {
  const canModifyPostedTransaction = transaction.status === 'POSTED'

  return [
    {
      id: 'view',
      label: 'Посмотреть',
      href: `/transactions/${transaction.operationId}`
    },
    {
      id: 'refund',
      label: 'Возврат',
      requiresConfirmation: true,
      disabled: !permissions.canReturn || !canModifyPostedTransaction || transaction.isRefunded,
      disabledReason:
        transaction.status !== 'POSTED' ? 'Можно вернуть только проведённый документ' : undefined,
      showCondition: transaction.type === 'CHARGE'
    },
    {
      id: 'cancel',
      label: 'Отменить',
      requiresConfirmation: true,
      disabled: !canModifyPostedTransaction || transaction.isCanceled,
      disabledReason:
        transaction.status !== 'POSTED' ? 'Можно отменить только проведённый документ' : undefined,
      showCondition: transaction.type === 'REVERSAL'
    },
    {
      id: 'recreate',
      label: 'Пересоздать',
      requiresConfirmation: true,
      disabled: !permissions.canRecreate
    },
    {
      id: 'ignore',
      label: 'Игнорировать',
      requiresConfirmation: true,
      showCondition: transaction.status === 'POSTED'
    }
  ]
}

import type { Transactions } from '@/server/repositories/transactions/get-all-transactions'

export function getReasonLabel(transaction: Transactions) {
  if (transaction.isCanceled) return 'Отменено'
  if (transaction.isRefunded) return 'Возвращено'

  switch (transaction.reason) {
    case 'NEW_ORDER':
      return 'Новый заказ'
    case 'CANCELLATION':
      return 'Отменено'
    case 'REFUND':
      return 'Возврат'
    case 'REFUND_CANCELLATION':
      return 'Отмена возврата'
    default:
      return transaction.reason
  }
}

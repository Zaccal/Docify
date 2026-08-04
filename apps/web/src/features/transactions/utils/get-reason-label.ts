import type { Transactions } from '@/server/repositories/transactions/get-all-transactions'

export function getReasonLabel(transaction: Transactions) {
  console.log(transaction.isRefunded)
  if (transaction.isRefunded) return 'Возвращено'

  switch (transaction.reason) {
    case 'NEW_ORDER':
      return 'Новый заказ'
    case 'CORRECTION':
      return 'Исправление'
    case 'CANCELLATION':
      return 'Отмена'
    case 'REFUND':
      return 'Возврат'
  }
}

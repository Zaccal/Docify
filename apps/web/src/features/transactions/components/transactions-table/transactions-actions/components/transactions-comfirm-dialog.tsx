import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@Docify/ui/components/alert-dialog'

import type { TransactionAction } from '../models/transactions-actions'

interface TransactionsComfirmDialogProps {
  action: TransactionAction | null
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  isPending: boolean
}

const descriptions: Partial<Record<TransactionAction['id'], string>> = {
  refund: 'Документ будет возвращён, а операция отменена. Деньги могут быть возвращены.',
  recreate:
    'На основе этого документа будет создана новая копия. Операция не повлияет на финансовые данные и не изменит исходный документ.'
}

export default function TransactionsComfirmDialog({
  action,
  onConfirm,
  onOpenChange,
  isPending
}: TransactionsComfirmDialogProps) {
  return (
    <AlertDialog open={action !== null} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{action?.label}</AlertDialogTitle>
          <AlertDialogDescription>
            {action ? (descriptions[action.id] ?? 'Подтвердите выполнение действия.') : null}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} onClick={() => onOpenChange(false)}>
            Отмена
          </AlertDialogCancel>
          <AlertDialogAction loading={isPending} onClick={onConfirm}>
            Подтвердить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

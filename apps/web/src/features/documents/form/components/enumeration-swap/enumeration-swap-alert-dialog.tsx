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
import { truncate } from 'es-toolkit/compat'

import { useEnumerationSwapStore } from './enumeration-swap-store'

interface EnumerationSwapAlertDialogProps {
  open: boolean
  onOpenChange: (isOpen: boolean) => void
  onConfirm: () => void
  isPending: boolean
}

export default function EnumerationSwapAlertDialog({
  open,
  onOpenChange,
  onConfirm,
  isPending = false
}: EnumerationSwapAlertDialogProps) {
  const data = useEnumerationSwapStore((state) => state.data)

  // TODO: Extend conflict data
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Поменять номера документов?</AlertDialogTitle>
          <AlertDialogDescription>
            Документ с таким номером уже существует ({truncate(data?.conflictingCustomer.fullName)}
            ). Вы можете поменять номера текущего и существующего документов местами.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Отмена</AlertDialogCancel>
          <AlertDialogAction loading={isPending} onClick={onConfirm}>
            Подтвердить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

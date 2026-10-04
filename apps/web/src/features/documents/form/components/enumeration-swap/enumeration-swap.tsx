import { useTransition } from 'react'
import { toast } from 'sonner'

import { swapEnumeration } from '@/features/documents/create/actions/swap-enumeration'

import EnumerationSwapAlertDialog from './enumeration-swap-alert-dialog'
import { useEnumerationSwapStore } from './enumeration-swap-store'

interface EnumerationSwapProps {
  children: React.ReactNode
  onSuccess?: () => void
}

export default function EnumerationSwap({ children, onSuccess }: EnumerationSwapProps) {
  const { isOpen, toggle, close, data } = useEnumerationSwapStore((state) => state)
  const [isPending, startTransition] = useTransition()

  const handleConfirm = () => {
    startTransition(async () => {
      if (data?.currentDocument && data?.conflictingDocument) {
        const response = await swapEnumeration(data.currentDocument.id, data.conflictingDocument.id)
        if (!response.success) {
          toast.error('Упс, произошла ошибка!', { description: response.error })
          close()
          return
        }

        toast.success('Перестановка успешна!')
        close()
        onSuccess?.()
      }
    })
  }

  return (
    <>
      {children}
      <EnumerationSwapAlertDialog
        isPending={isPending}
        onConfirm={handleConfirm}
        onOpenChange={toggle}
        open={isOpen}
      />
    </>
  )
}

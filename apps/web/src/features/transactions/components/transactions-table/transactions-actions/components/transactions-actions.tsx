import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@Docify/ui/components/dropdown-menu'
import { EllipsisIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { Route } from 'next'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

import { useCompanySelect } from '@/components/company-select/company-select-store'
import { cancelAction } from '@/features/transactions/actions/cancel-action'
import { ignoreAction } from '@/features/transactions/actions/ignore-action'
import { refundAction } from '@/features/transactions/actions/refund-action'
import { useRecreate } from '@/features/transactions/hooks/use-recreate'
import type { Transactions } from '@/server/repositories/transactions/get-all-transactions'

import { getTransactionActions } from '../models/get-transactions-actions'
import type { TransactionAction, TransactionActionId } from '../models/transactions-actions'
import { actionIcons } from '../models/transactions-actions-icons'
import TransactionsComfirmDialog from './transactions-comfirm-dialog'

interface TransactionsActionsProps {
  transaction: Transactions
}

export default function TransactionsActions({ transaction }: TransactionsActionsProps) {
  const [selectedAction, setSelectedAction] = useState<TransactionAction | null>(null)
  const [isPending, startTransition] = useTransition()
  const actionsItems = getTransactionActions(transaction, {
    canEdit: true,
    canRecreate: true,
    canReturn: true
  })
  const router = useRouter()
  const recreateHandler = useRecreate(transaction)
  const { company } = useCompanySelect()

  function executeAction(action: TransactionAction) {
    if (action.requiresConfirmation) {
      setSelectedAction(action)
      return
    }

    runMutation(action.id)
  }

  function runMutation(actionId: TransactionActionId) {
    startTransition(async () => {
      switch (actionId) {
        case 'recreate':
          recreateHandler()
          break
        case 'refund':
          const refundResult = await refundAction(transaction.id, company)
          if (!refundResult.success) toast.error(refundResult.error)
          else toast.success('Возврат успешно выполнен')
          break
        case 'view':
          pushHandler(actionId)
          break
        case 'cancel':
          const cancelResult = await cancelAction(transaction.id)
          if (!cancelResult.success) toast.error(cancelResult.error)
          else toast.success('Транзакция успешно отменена')
          break
        case 'ignore':
          const ignoreResult = await ignoreAction(transaction.id)
          if (!ignoreResult.success) toast.error(ignoreResult.error)
          else toast.success('Транзакция успешно игнорирована')
          break
      }

      setSelectedAction(null)
    })
  }

  function pushHandler(actionId: string) {
    const action = actionsItems.find((item) => item.id === actionId)
    if (action && action.href) router.push(action.href as Route)
  }

  return (
    <>
      <div className="flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <HugeiconsIcon icon={EllipsisIcon} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuGroup>
              {actionsItems.map((item) => {
                if (item.showCondition === false) return null

                const Icon = actionIcons[item.id]
                return (
                  <DropdownMenuItem
                    onClick={() => executeAction(item)}
                    key={item.id}
                    disabled={item.disabled}
                    title={item.disabledReason}
                  >
                    <HugeiconsIcon icon={Icon} />
                    {item.label}
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <TransactionsComfirmDialog
        isPending={isPending}
        action={selectedAction}
        onConfirm={() => {
          if (selectedAction) {
            runMutation(selectedAction.id)
          }
        }}
        onOpenChange={(open) => {
          if (!open) setSelectedAction(null)
        }}
      />
    </>
  )
}

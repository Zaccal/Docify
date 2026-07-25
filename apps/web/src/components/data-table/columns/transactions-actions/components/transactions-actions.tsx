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
import Link from 'next/link'
import { useState, useTransition } from 'react'

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
          break
        case 'edit':
          break
        case 'return':
          break
        case 'view':
          break
      }
    })
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
                const Icon = actionIcons[item.id]
                if (item.href && !item.disabled) {
                  return (
                    <DropdownMenuItem key={item.id} render={<Link href={item.href as Route} />}>
                      <HugeiconsIcon icon={Icon} />
                      {item.label}
                    </DropdownMenuItem>
                  )
                }

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

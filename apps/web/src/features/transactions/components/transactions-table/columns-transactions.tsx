'use client'

import { Badge } from '@Docify/ui/components/badge'
import { cn } from '@Docify/ui/lib/utils'
import type { ColumnDef } from '@tanstack/react-table'
import { truncate } from 'es-toolkit/compat'

import CopyButton from '@/components/copy-button'
import SortingButton from '@/components/data-table/sorting-button'
import type { Transactions } from '@/server/repositories/transactions/get-all-transactions'

import { getReasonLabel } from '../../utils/get-reason-label'
import TransactionsActions from './transactions-actions/components/transactions-actions'

export const transactionsColumns: ColumnDef<Transactions>[] = [
  {
    accessorKey: 'operationId',
    header: 'Номер операции',
    cell: ({ row }) => (
      <CopyButton copyValue={row.original.operationId} className="pl-0 font-normal" size={'sm'}>
        {truncate(row.original.operationId, { length: 10 })}
      </CopyButton>
    )
  },
  {
    accessorKey: 'company',
    header: 'ИП',
    cell: ({ row }) => (
      <span title={row.original.company ?? '—'}>
        {truncate(row.original.company ?? '—', { length: 10 })}
      </span>
    )
  },
  {
    accessorKey: 'transactionDate',
    sortingFn: 'datetime',
    header: ({ column }) => (
      <SortingButton sorted={column.getIsSorted() === 'asc'} column={column}>
        Дата
      </SortingButton>
    ),
    cell: ({ row }) =>
      new Intl.DateTimeFormat('ru-RU', {
        dateStyle: 'short',
        timeStyle: 'short'
      }).format(new Date(row.original.transactionDate))
  },
  {
    id: 'documentEnumeration',
    accessorFn: (row) => Number(row.snapshot.document.enumeration),
    sortingFn: 'basic',
    header: ({ column }) => (
      <SortingButton sorted={column.getIsSorted() === 'asc'} column={column}>
        Номер документа
      </SortingButton>
    ),
    cell: ({ row }) => `№${row.original.snapshot.document.enumeration}`
  },
  {
    id: 'customerName',
    accessorFn: (row) => row.snapshot.customer.fullnameClient ?? '—',
    header: ({ column }) => (
      <SortingButton sorted={column.getIsSorted() === 'asc'} column={column}>
        ФИО клиента
      </SortingButton>
    ),
    sortingFn: 'alphanumeric'
  },
  {
    id: 'organizationName',
    accessorFn: (row) => row.snapshot.organization.organization ?? '—',
    header: ({ column }) => (
      <SortingButton sorted={column.getIsSorted() === 'asc'} column={column}>
        Название организации
      </SortingButton>
    ),
    sortingFn: 'alphanumeric',
    cell: ({ row }) => (
      <span title={row.original.snapshot.organization.organization ?? '—'}>
        {truncate(row.original.snapshot.organization.organization ?? '—')}
      </span>
    )
  },
  {
    accessorKey: 'reason',
    header: 'Операция',
    cell: ({ row }) => <Badge variant={'outline'}>{getReasonLabel(row.original)}</Badge>
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ row }) => (
      <Badge variant={row.original.status === 'POSTED' ? 'success' : 'destructive'}>
        {row.original.status === 'POSTED' ? 'Проведено' : 'Не проведено'}
      </Badge>
    )
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <SortingButton sorted={column.getIsSorted() === 'asc'} column={column}>
        Сумма
      </SortingButton>
    ),
    sortingFn: 'alphanumeric',
    cell: ({ row }) => {
      const amount = row.original.amount

      const formattedAmount = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'KZT',
        maximumFractionDigits: 0,
        signDisplay: 'always'
      }).format(amount)

      return (
        <span className={cn('font-medium', amount < 0 ? 'text-destructive' : 'text-green-600')}>
          {formattedAmount}
        </span>
      )
    }
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Действия</div>,
    meta: {
      align: 'center'
    },
    cell: ({ row }) => <TransactionsActions transaction={row.original} />
  }
]

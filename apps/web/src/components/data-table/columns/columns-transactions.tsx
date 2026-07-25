'use client'

import { Badge } from '@Docify/ui/components/badge'
import type { ColumnDef } from '@tanstack/react-table'
import { truncate } from 'es-toolkit/compat'

import type { Transactions } from '@/server/repositories/transactions/get-all-transactions'

import CopyButton from '../../copy-button'
import SortingButton from '../sorting-button'
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
    sortingFn: 'alphanumeric',
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
    cell: ({ row }) => (
      <Badge variant={'outline'}>
        {row.original.reason === 'CANCELLATION'
          ? 'Отмена'
          : row.original.reason === 'NEW_ORDER'
            ? 'Новый заказ'
            : 'Исправление'}
      </Badge>
    )
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
    cell: ({ row }) =>
      new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'KZT',
        maximumFractionDigits: 0
      }).format(row.original.amount)
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

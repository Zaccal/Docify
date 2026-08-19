'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { truncate } from 'es-toolkit/compat'

import CopyButton from '@/components/copy-button'
import SortingButton from '@/components/data-table/sorting-button'
import type { DocumentListItem } from '@/server/repositories/documents/get-all-documents'

import DocumentActions from './document-actions'

export const documentsColumns: ColumnDef<DocumentListItem>[] = [
  {
    id: 'createdAt',
    accessorFn: (row) => row.createdAt,
    sortingFn: 'datetime',
    header: ({ column }) => (
      <SortingButton sorted={column.getIsSorted() === 'asc'} column={column}>
        Создан
      </SortingButton>
    ),
    cell: ({ row }) => format(row.original.createdAt, 'dd.MM.yyyy HH:mm')
  },
  {
    id: 'updatedAt',
    accessorFn: (row) => row.updatedAt,
    sortingFn: 'datetime',
    header: ({ column }) => (
      <SortingButton sorted={column.getIsSorted() === 'asc'} column={column}>
        Обновлён
      </SortingButton>
    ),
    cell: ({ row }) => format(row.original.updatedAt, 'dd.MM.yyyy HH:mm')
  },
  {
    accessorKey: 'enumeration',
    header: ({ column }) => (
      <SortingButton sorted={column.getIsSorted() === 'asc'} column={column}>
        Номер
      </SortingButton>
    ),
    cell: ({ row }) => <div>№{row.original.enumeration}</div>
  },
  {
    id: 'customerName',
    accessorFn: (row) => row.customer.fullnameClient,
    header: ({ column }) => (
      <SortingButton sorted={column.getIsSorted() === 'asc'} column={column}>
        Клиент
      </SortingButton>
    ),
    cell: ({ row }) => (
      <span title={row.original.customer.fullnameClient}>
        {truncate(row.original.customer.fullnameClient, { length: 28 })}
      </span>
    )
  },
  {
    id: 'iin',
    accessorFn: (row) => row.customer.iin,
    header: 'ИИН',
    cell: ({ row }) => (
      <CopyButton copyValue={row.original.customer.iin} className="pl-0 font-normal" size="sm">
        {row.original.customer.iin}
      </CopyButton>
    )
  },
  {
    id: 'organization',
    accessorFn: (row) => row.customer.organization.organization,
    header: ({ column }) => (
      <SortingButton sorted={column.getIsSorted() === 'asc'} column={column}>
        Организация
      </SortingButton>
    ),
    cell: ({ row }) => (
      <span title={row.original.customer.organization.organization}>
        {truncate(row.original.customer.organization.organization, { length: 32 })}
      </span>
    )
  },
  {
    id: 'bin',
    accessorFn: (row) => row.customer.organization.bin,
    header: 'БИН'
  },
  {
    id: 'documentDate',
    accessorFn: (row) => row.documentDate.join(' - '),
    header: 'Дата документа',
    cell: ({ row }) => row.original.documentDate.join(' - ')
  },
  {
    id: 'total',
    accessorFn: (row) => row.customer.organization.totalCost,
    header: ({ column }) => (
      <SortingButton sorted={column.getIsSorted() === 'asc'} column={column}>
        Сумма
      </SortingButton>
    ),
    cell: ({ row }) =>
      new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'KZT',
        maximumFractionDigits: 0
      }).format(row.original.customer.organization.totalCost)
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Действия</div>,
    cell: ({ row }) => <DocumentActions document={row.original} />
  }
]

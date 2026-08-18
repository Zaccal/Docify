'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { truncate } from 'es-toolkit/compat'

import type { LatestEditedDocuments } from '@/server/repositories/documents/get-lastest-edited-documents'

export const recentDocumentsColumns: ColumnDef<LatestEditedDocuments[number]>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Дата',
    cell: ({ row }) => <div>{format(row.original.createdAt, 'dd.MM.yyyy')}</div>
  },
  {
    accessorKey: 'enumeration',
    header: 'Номер',
    cell: ({ row }) => <div>№{row.getValue('enumeration')}</div>
  },
  {
    id: 'customerName',
    header: 'Клиент',
    cell: ({ row }) => <div>{row.original.customer.fullnameClient}</div>
  },
  {
    id: 'organization',
    header: 'Организация',
    cell: ({ row }) => (
      <div title={row.original.customer.organization.organization}>
        {truncate(row.original.customer.organization.organization)}
      </div>
    )
  },
  {
    id: 'total',
    header: 'Сумма',
    cell: ({ row }) => (
      <div>
        {new Intl.NumberFormat('ru-RU', {
          style: 'currency',
          currency: 'KZT',
          maximumFractionDigits: 0,
          signDisplay: 'always'
        }).format(row.original.customer.organization.totalCost)}
      </div>
    )
  },
  {
    accessorKey: 'documentDate',
    header: 'Дата документа',
    cell: ({ row }) => <div>{row.original.documentDate.join(' - ')}</div>
  }
]

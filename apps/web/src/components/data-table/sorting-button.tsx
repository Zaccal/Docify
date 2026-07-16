import { Button } from '@Docify/ui/components/button'
import { ArrowDown01Icon, ArrowUp01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { Column } from '@tanstack/react-table'

interface SortingButtonProps<T = unknown> {
  column: Column<T>
  children: string
  sorted: boolean
}

export default function SortingButton<T = unknown>({
  column,
  children,
  sorted
}: SortingButtonProps<T>) {
  return (
    <Button
      variant={'ghost'}
      className="pl-0"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {children}
      {sorted && <HugeiconsIcon key="asc" icon={ArrowUp01Icon} className="size-4" />}

      {!sorted && <HugeiconsIcon key="desc" icon={ArrowDown01Icon} className="size-4" />}
    </Button>
  )
}

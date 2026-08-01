import { cn } from '@Docify/ui/lib/utils'
import type { ReactNode } from 'react'

interface DetailSectionProps {
  children?: ReactNode
  className?: string
}

export function DetailSection({ children, className }: DetailSectionProps) {
  return (
    <div
      className={cn(
        'border-border rounded-2xl border px-5 py-4 bg-surface-container-lowest',
        className
      )}
    >
      {children}
    </div>
  )
}

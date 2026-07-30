import { cn } from '@Docify/ui/lib/utils'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

export default function MetaCardSecondaryLine({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>) {
  return (
    <p {...props} className={cn('text-muted-foreground truncate text-xs font-medium', className)}>
      {children}
    </p>
  )
}

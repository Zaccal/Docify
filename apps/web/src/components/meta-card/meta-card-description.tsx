import { cn } from '@Docify/ui/lib/utils'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

export default function MetaCardDescription({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>) {
  return (
    <p {...props} className={cn('text-muted-foreground text-sm font-semibold', className)}>
      {children}
    </p>
  )
}

import { cn } from '@Docify/ui/lib/utils'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

export default function MetaCardTitle({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>) {
  return (
    <h4 {...props} className={cn('text-xl font-semibold', className)}>
      {children}
    </h4>
  )
}

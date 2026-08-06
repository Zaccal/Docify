import { cn } from '@Docify/ui/lib/utils'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

export default function DetailSectionTitle({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>) {
  return (
    <h5 {...props} className={cn('font-semibold text-lg', className)}>
      {children}
    </h5>
  )
}

import { cn } from '@Docify/ui/lib/utils'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

export default function DetailSectionDescription({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>) {
  return (
    <p {...props} className={cn('mt-2 text-muted-foreground text-sm', className)}>
      {children}
    </p>
  )
}

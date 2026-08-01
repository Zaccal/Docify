import { CardDescription } from '@Docify/ui/components/card'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

export default function MetaCardDescription({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>) {
  return (
    <CardDescription {...props} className={className}>
      {children}
    </CardDescription>
  )
}

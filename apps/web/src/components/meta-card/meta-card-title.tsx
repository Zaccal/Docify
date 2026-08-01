import { CardTitle } from '@Docify/ui/components/card'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

export default function MetaCardTitle({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>) {
  return (
    <CardTitle {...props} className={className}>
      {children}
    </CardTitle>
  )
}

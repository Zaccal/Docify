import { Separator } from '@Docify/ui/components/separator'
import { cn } from '@Docify/ui/lib/utils'
import type { Home01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { CARD_HEADER_COLORS } from '../../libs/constants'

interface DocumentFieldCardHeaderProps {
  icon: typeof Home01Icon
  color: keyof typeof CARD_HEADER_COLORS
  title: string
  description: string
}

export default function DocumentFieldCardHeader({
  icon,
  color,
  title,
  description
}: DocumentFieldCardHeaderProps) {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className={cn('rounded-md p-2', CARD_HEADER_COLORS[color])}>
          <HugeiconsIcon icon={icon} />
        </div>
        <div>
          <p>{title}</p>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
      <Separator className="my-3" />
    </>
  )
}

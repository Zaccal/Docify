import { cn } from '@Docify/ui/lib/utils'
import type { ViewIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

interface MetaCardIconProps {
  icon: typeof ViewIcon
  className?: string
}

export default function MetaCardIcon({ icon, className }: MetaCardIconProps) {
  return (
    <div
      className={cn(
        'flex size-11 shrink-0 items-center justify-center',
        'rounded-xl',
        'bg-primary-container text-on-primary-container',
        'transition-colors',
        className
      )}
    >
      <HugeiconsIcon icon={icon} className="size-5" strokeWidth={1.75} />
    </div>
  )
}

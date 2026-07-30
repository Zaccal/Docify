import { cn } from '@Docify/ui/lib/utils'
import type { ViewIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

const backgroundColors = {
  red: 'bg-orange-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  purple: 'bg-purple-500',
  yellow: 'bg-yellow-500'
} as const

type Color = keyof typeof backgroundColors

interface MetaCardIconProps {
  icon: typeof ViewIcon
  color: Color
}

export default function MetaCardIcon({ icon, color }: MetaCardIconProps) {
  return (
    <div
      className={cn(
        'flex size-10 shrink-0 items-center justify-center',
        'rounded-lg bg-linear-to-br text-white shadow-sm',
        backgroundColors[color]
      )}
    >
      <HugeiconsIcon className="size-5" strokeWidth={2} icon={icon} />
    </div>
  )
}

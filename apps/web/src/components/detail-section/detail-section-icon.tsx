import type { ViewIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

const textColors = {
  red: 'text-red-500',
  blue: 'text-blue-500',
  green: 'text-green-500',
  purple: 'text-purple-500',
  yellow: 'text-yellow-500'
} as const

type Color = keyof typeof textColors

interface DetailSectionIconProps {
  icon: typeof ViewIcon
  color: Color
}

export default function DetailSectionIcon({ icon, color }: DetailSectionIconProps) {
  return (
    <>
      <HugeiconsIcon icon={icon} className={textColors[color]} />
    </>
  )
}

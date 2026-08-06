import type { ViewIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

interface DetailSectionIconProps {
  icon: typeof ViewIcon
}

export default function DetailSectionIcon({ icon }: DetailSectionIconProps) {
  return (
    <>
      <HugeiconsIcon icon={icon} className="text-on-primary-container" />
    </>
  )
}

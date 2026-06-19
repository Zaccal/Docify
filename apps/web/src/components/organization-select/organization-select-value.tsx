'use client'

import { Building03Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { useOrganizationSelect } from './organization-select-store'

export default function OrganizationSelectValue() {
  const { organization } = useOrganizationSelect()

  return (
    <div className="bg-primary text-primary-foreground flex items-center gap-2 rounded-full px-4 py-2">
      <HugeiconsIcon icon={Building03Icon} />
      <span>{organization}</span>
    </div>
  )
}

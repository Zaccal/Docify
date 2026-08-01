'use client'

import { Building03Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { useCompanySelect } from './company-select-store'

export default function CompanySelectValue() {
  const { company } = useCompanySelect()

  return (
    <div className="bg-secondary-container text-on-secondary-container flex h-fit w-fit items-center gap-2 rounded-full px-4 py-2">
      <HugeiconsIcon icon={Building03Icon} />
      <span>{company}</span>
    </div>
  )
}

'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@Docify/ui/components/select'
import { Building03Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { DEFAULT_COMPANY_TYPE } from '@/lib/constants'
import type { Company } from '@/types/company.type'

import { useCompanySelect } from './company-select-store'

export default function OrganizationSelect() {
  const { company, setCompany } = useCompanySelect()

  return (
    <>
      <Select
        value={company}
        onValueChange={(value) => {
          setCompany((value ?? DEFAULT_COMPANY_TYPE) as Company)
        }}
      >
        <SelectTrigger className="w-full">
          <HugeiconsIcon icon={Building03Icon} />
          <SelectValue placeholder="Выберите организацию" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Организация</SelectLabel>
            <SelectItem value="NomadDocs">NomadDocs</SelectItem>
            <SelectItem value="XANSHA">XANSHA</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}

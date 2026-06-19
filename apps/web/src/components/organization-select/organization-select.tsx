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

import type { Organization } from '@/types/organization.type'

import { useOrganizationSelect } from './organization-select-store'

export default function OrganizationSelect() {
  const { organization, setOrganization } = useOrganizationSelect()

  return (
    <>
      <Select
        value={organization}
        onValueChange={(value) => {
          setOrganization((value ?? 'XANSHA') as Organization)
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

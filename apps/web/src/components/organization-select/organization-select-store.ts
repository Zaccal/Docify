'use client'

import { createContext, createElement, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import type { Organization } from '@/types/organization.type'

interface OrganizationSelectContextValue {
  organization: Organization
  setOrganization: (organization: Organization) => void
}

const OrganizationSelectContext = createContext<OrganizationSelectContextValue | null>(null)

export function OrganizationSelectProvider({ children }: { children: ReactNode }) {
  const [organization, setOrganization] = useState<Organization>('XANSHA')
  const value = useMemo(() => ({ organization, setOrganization }), [organization])

  return createElement(OrganizationSelectContext.Provider, { value }, children)
}

export function useOrganizationSelect() {
  const context = useContext(OrganizationSelectContext)

  if (!context) {
    throw new Error('useOrganizationSelect must be used within OrganizationSelectProvider.')
  }

  return context
}

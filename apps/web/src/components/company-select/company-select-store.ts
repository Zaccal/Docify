'use client'

import { createContext, createElement, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import type { Company } from '@/types/company.type'

interface CompanySelectContextValue {
  company: Company
  setCompany: (company: Company) => void
}

const CompanySelectContext = createContext<CompanySelectContextValue | null>(null)

export function CompanySelectProvider({ children }: { children: ReactNode }) {
  const [company, setCompany] = useState<Company>('XANSHA')
  const value = useMemo(() => ({ company, setCompany }), [company])

  return createElement(CompanySelectContext.Provider, { value }, children)
}

export function useCompanySelect() {
  const context = useContext(CompanySelectContext)

  if (!context) {
    throw new Error('useCompanySelect must be used within CompanySelectProvider.')
  }

  return context
}

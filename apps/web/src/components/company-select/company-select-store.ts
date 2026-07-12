'use client'

import { createContext, createElement, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'

import { useLocalStorage } from '@/hooks'
import { COMPANY_LOCAL_STORAGE_KEY, DEFAULT_COMPANY_TYPE } from '@/lib/constants'
import type { Company } from '@/types/company.type'

interface CompanySelectContextValue {
  company: Company
  setCompany: (company: Company) => void
}

const CompanySelectContext = createContext<CompanySelectContextValue | null>(null)

export function CompanySelectProvider({ children }: { children: ReactNode }) {
  const { value: company, set: setCompany } = useLocalStorage<Company>(
    COMPANY_LOCAL_STORAGE_KEY,
    DEFAULT_COMPANY_TYPE
  )
  const value = useMemo(() => ({ company: company ?? DEFAULT_COMPANY_TYPE, setCompany }), [company])

  return createElement(CompanySelectContext.Provider, { value }, children)
}

export function useCompanySelect() {
  const context = useContext(CompanySelectContext)

  if (!context) {
    throw new Error('useCompanySelect must be used within CompanySelectProvider.')
  }

  return context
}

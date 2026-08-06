import type { ReactNode } from 'react'

interface DetailSectionHeaderProps {
  children?: ReactNode
}

export default function DetailSectionHeader({ children }: DetailSectionHeaderProps) {
  return <div className="border-border flex items-center gap-5 border-b-2 pb-4">{children}</div>
}

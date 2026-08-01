import type { ReactNode } from 'react'

interface DetailSectionItemProps {
  keyOfValue: string
  children?: ReactNode
}

export default function DetailSectionItem({ keyOfValue, children }: DetailSectionItemProps) {
  return (
    <li className="hover:bg-surface-container-high grid w-full grid-cols-[180px_minmax(0,1fr)] items-center gap-6 py-2">
      <span className="text-on-surface-variant text-sm font-medium">{keyOfValue}</span>
      <span className="text-on-surface text-sm">{children}</span>
    </li>
  )
}

import type { ReactNode } from 'react'

interface DetailSectionItemProps {
  keyOfValue: string
  children?: ReactNode
}

export default function DetailSectionItem({ keyOfValue, children }: DetailSectionItemProps) {
  return (
    <li className="flex w-full items-center justify-between gap-4 py-2">
      <span className="font-bold">{keyOfValue}</span>
      <span className="text-muted-foreground">{children}</span>
    </li>
  )
}

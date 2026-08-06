import type { ReactNode } from 'react'

interface DetailSectionContentProps {
  children?: ReactNode
}

export default function DetailSectionContent({ children }: DetailSectionContentProps) {
  return (
    <ul className="*:border-outline-variant/50 mt-3 w-full *:border-b [&>*:last-child]:border-b-0">
      {children}
    </ul>
  )
}

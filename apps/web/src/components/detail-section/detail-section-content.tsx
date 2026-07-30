import type { ReactNode } from 'react'

interface DetailSectionContentProps {
  children?: ReactNode
}

export default function DetailSectionContent({ children }: DetailSectionContentProps) {
  return <ul className="mt-3 w-full *:border-b [&>*:last-child]:border-b-0">{children}</ul>
}

import { Children, isValidElement, type ReactNode } from 'react'

import MetaCardIcon from './meta-card-icon'

interface MetaCardProps {
  children?: ReactNode
}

export function MetaCard({ children }: MetaCardProps) {
  const childrenArray = Children.toArray(children)

  return (
    <div className={'border-border rounded-md border px-4 py-3'}>
      <div className="flex items-start gap-4 pr-4">
        {childrenArray.filter((child) => isValidElement(child) && child.type === MetaCardIcon)}
        <div className="flex flex-col gap-1">
          {childrenArray.filter((child) => isValidElement(child) && child.type !== MetaCardIcon)}
        </div>
      </div>
    </div>
  )
}

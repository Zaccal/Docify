import { Card, CardContent } from '@Docify/ui/components/card'
import { Children, isValidElement, type ReactNode } from 'react'

import MetaCardIcon from './meta-card-icon'

interface MetaCardProps {
  children?: ReactNode
}

export function MetaCard({ children }: MetaCardProps) {
  const childrenArray = Children.toArray(children)

  return (
    <Card className="bg-surface-container-low!">
      <CardContent className="flex items-start gap-4 pr-4">
        {childrenArray.filter((child) => isValidElement(child) && child.type === MetaCardIcon)}
        <div className="flex flex-col gap-1">
          {childrenArray.filter((child) => isValidElement(child) && child.type !== MetaCardIcon)}
        </div>
      </CardContent>
    </Card>
  )
}

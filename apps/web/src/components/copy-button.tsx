import { Button, type ButtonProps } from '@Docify/ui/components/button'
import { cn } from '@Docify/ui/lib/utils'
import { CopyCheckIcon, CopyIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { ReactNode } from 'react'

import { useCopy } from '@/hooks'

interface CopyButtonProps extends ButtonProps {
  showIcon?: boolean
  children: ReactNode | ReactNode[]
  copyValue: string
}

export default function CopyButton({
  showIcon = true,
  children,
  copyValue,
  ...props
}: CopyButtonProps) {
  const { copy, copied } = useCopy()

  return (
    <Button
      className={cn(copied ? 'text-green-600' : 'text-muted-foreground')}
      onClick={() => copy(copyValue)}
      variant="ghost"
      {...props}
    >
      {showIcon && (
        <HugeiconsIcon
          className={cn(copied ? 'text-green-600' : 'text-muted-foreground')}
          icon={copied ? CopyCheckIcon : CopyIcon}
        />
      )}
      <span className={cn(copied ? 'text-green-600' : '')}>{copied ? 'Готово!' : children}</span>
    </Button>
  )
}

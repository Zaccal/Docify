import { Separator } from '@Docify/ui/components/separator'
import { cn } from '@Docify/ui/lib/utils'
import { type IconSvgObject } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

interface CreateDocumentCardHeaderProps {
  icon: IconSvgObject
  color: string
  title: string
  description: string
}

export default function CreateDocumentCardHeader({
  icon,
  color,
  title,
  description
}: CreateDocumentCardHeaderProps) {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className={cn('rounded-md p-2', `bg-${color}-100`, `text-${color}-400`)}>
          <HugeiconsIcon icon={icon} />
        </div>
        <div>
          <p>{title}</p>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
      <Separator className="my-3" />
    </>
  )
}

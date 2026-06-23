import { TickDouble04Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

interface ExistingDocumentSearchNoticeProps {
  children: React.ReactNode | React.ReactNode[]
}

export default function ExistingDocumentSearchNotice({
  children
}: ExistingDocumentSearchNoticeProps) {
  return (
    <>
      <div className="bg-primary text-primary-foreground border-primary-foreground mt-4 flex items-center gap-4 rounded-lg px-2 py-4">
        <HugeiconsIcon icon={TickDouble04Icon} />
        <span>{children}</span>
      </div>
    </>
  )
}

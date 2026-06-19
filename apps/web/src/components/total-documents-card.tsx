import { Badge } from '@Docify/ui/components/badge'
import { Card, CardContent } from '@Docify/ui/components/card'
import { ChartIncreaseIcon, DocumentAttachmentIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export default function TotalDocumentsCard() {
  return (
    <Card className="h-full">
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="bg-primary text-primary-foreground rounded-full p-4">
            <HugeiconsIcon icon={DocumentAttachmentIcon} size={28} />
          </div>
          <div>
            <h3 className="text-lg">Общее количество документов</h3>
            <span className="text-2xl font-bold">155</span>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-4">
          <Badge variant={'success'}>
            <HugeiconsIcon icon={ChartIncreaseIcon} />
            12%
          </Badge>
          <span className="text-muted-foreground text-sm">по сравнению с предыдущими 30 днями</span>
        </div>
      </CardContent>
    </Card>
  )
}

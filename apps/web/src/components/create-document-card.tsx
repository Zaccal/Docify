import { Button } from '@Docify/ui/components/button'
import { Card, CardContent } from '@Docify/ui/components/card'
import { ArrowRight02Icon, Plus } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'

export default function CreateDocumentCard() {
  return (
    <>
      <Card className="h-full">
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="bg-primary/20 border-primary/25 rounded-full border p-4">
              <Button render={<Link href={'/create-document'} />} size={'icon-xl'}>
                <HugeiconsIcon icon={Plus} />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">Создать новый документ</h2>
                <p className="text-muted-foreground">
                  Создавайте договоры и документы за несколько кликов.
                </p>
              </div>
              <Button render={<Link href={'/create-document'} />} size={'sm'}>
                Создать документ
                <HugeiconsIcon icon={ArrowRight02Icon} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

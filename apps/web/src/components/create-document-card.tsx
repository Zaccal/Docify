import { Button } from '@Docify/ui/components/button'
import { Card, CardContent } from '@Docify/ui/components/card'
import { ArrowRight02Icon, Plus } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { Route } from 'next'
import Link from 'next/link'

const CREATE_DOCUMENT_ROUTE = '/create-document' as Route

export default function CreateDocumentCard() {
  return (
    <>
      <Card className="h-full">
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="bg-primary/20 border-primary/25 rounded-full border p-4">
              <Button
                nativeButton={false}
                render={<Link href={CREATE_DOCUMENT_ROUTE} />}
                size="icon-lg"
              >
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
              <Button nativeButton={false} render={<Link href={CREATE_DOCUMENT_ROUTE} />} size="sm">
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

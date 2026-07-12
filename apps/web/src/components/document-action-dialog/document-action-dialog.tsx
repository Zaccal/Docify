'use client'

import { Button } from '@Docify/ui/components/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@Docify/ui/components/dialog'
import { Label } from '@Docify/ui/components/label'
import { RadioGroup, RadioGroupItem } from '@Docify/ui/components/radio-group'
import { Separator } from '@Docify/ui/components/separator'

import { ACTIONS } from '@/lib/constants'

import { useDocumentActionDialogStore } from './document-action-dialog.store'

interface DocumentActionDialogProps {
  children: React.ReactNode | React.ReactNode[]
}

export default function DocumentActionDialog({ children }: DocumentActionDialogProps) {
  const { selectedAction, setSelectedAction } = useDocumentActionDialogStore((state) => state)

  return (
    <Dialog>
      <DialogTrigger nativeButton={false} render={<div />}>
        <Button>Выбрать действие</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Действия с документом</DialogTitle>
          <DialogDescription>Выберите действие для документа</DialogDescription>
        </DialogHeader>

        <RadioGroup value={selectedAction} onValueChange={setSelectedAction} className="gap-6">
          {ACTIONS.map((action) => (
            <Label
              key={action.value}
              htmlFor={action.value}
              className="flex cursor-pointer items-center gap-4"
            >
              <RadioGroupItem id={action.value} value={action.value} />

              <div className="">
                <span>{action.title}</span>
                <p className="text-muted-foreground mt-1 leading-5.5">{action.description}</p>
              </div>
            </Label>
          ))}
        </RadioGroup>

        <Separator />
        {children}
      </DialogContent>
    </Dialog>
  )
}

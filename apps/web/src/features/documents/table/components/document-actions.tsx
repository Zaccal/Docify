'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@Docify/ui/components/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@Docify/ui/components/dropdown-menu'
import { Delete02Icon, EllipsisIcon, ViewIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { Route } from 'next'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

import type { DocumentListItem } from '@/server/repositories/documents/get-all-documents'

import { deleteDocumentAction } from '../actions/delete-document-action'

interface DocumentActionsProps {
  document: DocumentListItem
}

export default function DocumentActions({ document }: DocumentActionsProps) {
  const router = useRouter()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  function viewDocument() {
    router.push(`/documents/${document.id}` as Route)
  }

  function deleteHandler() {
    startTransition(async () => {
      const result = await deleteDocumentAction(document.id)

      if (!result.success) {
        toast.error(result.error)
        return
      }

      toast.success('Документ удалён')
      setIsConfirmOpen(false)
    })
  }

  return (
    <>
      <div className="flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <HugeiconsIcon icon={EllipsisIcon} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={viewDocument}>
                <HugeiconsIcon icon={ViewIcon} />
                Открыть
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onClick={() => setIsConfirmOpen(true)}>
                <HugeiconsIcon icon={Delete02Icon} />
                Удалить
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить документ №{document.enumeration}?</AlertDialogTitle>
            <AlertDialogDescription>
              Документ будет удалён из базы. Связанные операции останутся в истории без ссылки на
              этот документ.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Отмена</AlertDialogCancel>
            <AlertDialogAction loading={isPending} onClick={deleteHandler}>
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

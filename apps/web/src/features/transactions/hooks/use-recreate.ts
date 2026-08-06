import { toast } from 'sonner'

import { useCompanySelect } from '@/components/company-select/company-select-store'
import { getUrlDownloadDocumentSnapshot } from '@/features/documents/utils/get-url-download-document'
import { useDownload } from '@/hooks/useDownload'
import type { Transactions } from '@/server/repositories/transactions/get-all-transactions'

export function useRecreate(transaction: Transactions) {
  const { company } = useCompanySelect()
  const { operationId, documentsTable } = transaction
  const { download } = useDownload()

  const downloadHandler = async () => {
    const url = getUrlDownloadDocumentSnapshot(
      operationId!,
      company,
      documentsTable?.customer.organization.templateType
    )
    const { error } = await download(url)

    if (error) throw new Error('Что-то пошло не так!')
  }

  const create = () => {
    toast.promise(downloadHandler, {
      loading: 'Скачивание...',
      success: 'Документ успешно скачан',
      error: 'Упс что-то пошло не так!'
    })
  }

  return create
}

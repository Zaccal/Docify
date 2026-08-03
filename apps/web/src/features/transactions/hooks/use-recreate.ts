import { toast } from 'sonner'

import { useCompanySelect } from '@/components/company-select/company-select-store'
import { getUrlDownloadDocument } from '@/features/documents/utils/get-url-download-document'
import { useDownload } from '@/hooks/useDownload'
import type { Transactions } from '@/server/repositories/transactions/get-all-transactions'

export function useRecreate(transaction: Transactions) {
  const { company } = useCompanySelect()
  const { documentId, documentsTable } = transaction
  const { download } = useDownload()

  const create = () => {
    const url = getUrlDownloadDocument(
      documentId!,
      company,
      documentsTable?.customer.organization.templateType
    )

    toast.promise(async () => await download(url), {
      loading: 'Скачивание...',
      success: 'Документ успешно скачан',
      error: 'Упс что-то пошло не так!'
    })
  }

  return create
}

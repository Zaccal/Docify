import DataTable from '@/components/data-table/data-table'
import { getAllDocuments } from '@/server/repositories/documents/get-all-documents'

import { documentsColumns } from './documents-columns'

export default async function DocumentsTable() {
  const documents = await getAllDocuments()

  return (
    <DataTable
      defaultSorting={[
        {
          id: 'updatedAt',
          desc: true
        }
      ]}
      columns={documentsColumns}
      data={documents}
    />
  )
}

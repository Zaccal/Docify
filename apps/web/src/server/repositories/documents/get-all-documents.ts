import 'server-only'
import { db, desc } from '@Docify/db'
import { DocumentsTable } from '@Docify/db/schema'

export async function getAllDocuments() {
  return await db.query.DocumentsTable.findMany({
    with: {
      customer: {
        with: {
          organization: true
        }
      }
    },
    orderBy: desc(DocumentsTable.updatedAt)
  })
}

export type DocumentListItem = Awaited<ReturnType<typeof getAllDocuments>>[number]

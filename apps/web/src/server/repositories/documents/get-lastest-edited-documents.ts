import { db, desc } from '@Docify/db'
import { DocumentsTable } from '@Docify/db/schema'
import 'server-only'

export async function getLatestEditedDocuments(limit: number = 10) {
  const documents = await db.query.DocumentsTable.findMany({
    limit,
    with: {
      customer: {
        with: {
          organization: true
        }
      }
    },
    orderBy: desc(DocumentsTable.updatedAt)
  })
  return documents
}

export type LatestEditedDocuments = Awaited<ReturnType<typeof getLatestEditedDocuments>>

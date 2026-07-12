import { db, eq } from '@Docify/db'
import { DocumentsTable } from '@Docify/db/schema'

export async function findDocumentById(id: string) {
  return await db.query.DocumentsTable.findFirst({
    where: eq(DocumentsTable.id, id),
    with: {
      customer: true,
      organization: true
    }
  })
}

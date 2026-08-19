import 'server-only'
import { db, eq } from '@Docify/db'
import { DocumentsTable } from '@Docify/db/schema'

export async function deleteDocument(id: string) {
  const [document] = await db.delete(DocumentsTable).where(eq(DocumentsTable.id, id)).returning({
    id: DocumentsTable.id
  })

  return document
}

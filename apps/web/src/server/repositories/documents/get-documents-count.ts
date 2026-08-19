import 'server-only'
import { db } from '@Docify/db'
import { DocumentsTable } from '@Docify/db/schema'

export async function getDocumentsCount() {
  return await db.$count(DocumentsTable)
}

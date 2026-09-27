import { and, eq, ne, sql, type db } from '@Docify/db'
import { DocumentsTable } from '@Docify/db/schema'
import 'server-only'

export async function findEnumerationConflict(
  tx: typeof db,
  enumeration: string,
  year: number,
  excludeDocumentId?: string
) {
  const condition = [
    eq(DocumentsTable.enumeration, enumeration),
    sql`EXTRACT(YEAR FROM ${DocumentsTable.createdAt}) = ${year}`
  ]

  if (excludeDocumentId) {
    condition.push(ne(DocumentsTable.id, excludeDocumentId))
  }

  const [document] = await tx
    .select({
      id: DocumentsTable.id,
      enumeration: DocumentsTable.enumeration,
      createdAt: DocumentsTable.createdAt
    })
    .from(DocumentsTable)
    .where(and(...condition))
    .limit(1)

  return document
}

import { and, eq, sql, type DocumentRow, type TransactionType } from '@Docify/db'
import { DocumentsTable } from '@Docify/db/schema'
import 'server-only'

export async function findDocumentByEnumerationAndYear(
  tx: TransactionType,
  enumeration: string,
  year: number
): Promise<DocumentRow | null> {
  const [document] = await tx
    .select()
    .from(DocumentsTable)
    .where(
      and(
        eq(DocumentsTable.enumeration, enumeration),

        sql`
          EXTRACT(YEAR FROM ${DocumentsTable.createdAt}) = ${year}
        `
      )
    )
    .limit(1)

  return document ?? null
}

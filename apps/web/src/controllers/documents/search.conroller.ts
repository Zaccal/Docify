import { and, db, eq, exists, ilike, or } from '@Docify/db'
import { CustomersTable, OrganizationsTable } from '@Docify/db/schema'

export async function searchDocuments(query: string) {
  return await db.query.DocumentsTable.findMany({
    where: (documents) =>
      or(
        eq(documents.enumeration, query),

        exists(
          db
            .select()
            .from(OrganizationsTable)
            .where(
              and(
                eq(OrganizationsTable.id, documents.organizationId),
                or(
                  ilike(OrganizationsTable.organization, `%${query}%`),
                  eq(OrganizationsTable.bin, query)
                )
              )
            )
        ),

        exists(
          db
            .select()
            .from(CustomersTable)
            .where(
              and(
                eq(CustomersTable.id, documents.customerId),
                or(
                  ilike(CustomersTable.fullnameClient, `%${query}%`),
                  eq(CustomersTable.clientIdNumber, query),
                  eq(CustomersTable.iin, query)
                )
              )
            )
        )
      ),
    with: {
      organization: true,
      customer: true
    }
  })
}

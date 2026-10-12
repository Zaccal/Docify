import { db, eq } from '@Docify/db'
import { CustomersTable } from '@Docify/db/schema'
import 'server-only'

export async function findCustomerFullNameById(id: string) {
  const [customer] = await db
    .select({ fullName: CustomersTable.fullnameClient })
    .from(CustomersTable)
    .where(eq(CustomersTable.id, id))

  return customer?.fullName ?? null
}

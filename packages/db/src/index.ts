import { env } from '@Docify/env/server'
import { drizzle } from 'drizzle-orm/node-postgres'

import * as schema from './schema'
export { DrizzleQueryError } from 'drizzle-orm'
export { DatabaseError } from 'pg'
export { or, ilike, eq, exists, and, gte, lt, sql, desc, sum } from 'drizzle-orm'
export type { AnyColumn } from 'drizzle-orm'
export * from './types/transaction-snapshot.type'

export function createDb() {
  return drizzle(env.DATABASE_URL, { schema })
}

export const db = createDb()

export type DatabaseType = typeof db
export type TransactionType = Parameters<Parameters<DatabaseType['transaction']>[0]>[0]

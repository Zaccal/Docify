import { env } from '@Docify/env/server'
import { drizzle } from 'drizzle-orm/node-postgres'

import * as schema from './schema'
export { DrizzleQueryError } from 'drizzle-orm'
export { DatabaseError } from 'pg'
export { or, ilike, eq, exists, and } from 'drizzle-orm'

export function createDb() {
  return drizzle(env.DATABASE_URL, { schema })
}

export const db = createDb()

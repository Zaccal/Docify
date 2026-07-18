import process from 'node:process'

import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined')
}

const pool = new Pool({
  connectionString
})

const db = drizzle(pool)

try {
  await migrate(db, {
    migrationsFolder: './src/migrations'
  })

  console.log('Migrations applied successfully')
} catch (error) {
  console.error('Migration failed:')

  if (error instanceof Error) {
    console.error(error.message)
    console.error(error.stack)
  } else {
    console.error(error)
  }

  process.exitCode = 1
} finally {
  await pool.end()
}

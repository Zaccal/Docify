import { ChildProcess, spawn } from 'node:child_process'

import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'

import { runCommand, waitForServer } from './utils'

export default async function runner(mode: 'ci' | 'default') {
  console.log('🐳 Starting PostgreSQL...')

  let postgres: StartedPostgreSqlContainer | undefined
  let next: ChildProcess | undefined

  try {
    postgres = await new PostgreSqlContainer('postgres:18-alpine')
      .withDatabase('docify_test')
      .withUsername('postgres')
      .withPassword('password')
      .start()

    const databaseUrl = postgres.getConnectionUri()

    console.log('🐘 PostgreSQL:', databaseUrl)

    console.log('📦 Running migrations...')

    await runCommand(
      'bun',
      ['run', 'db:migrate:file'],
      {
        DATABASE_URL: databaseUrl
      },
      'ignore'
    )

    console.log('🚀 Running Next.js...')

    next = spawn('bun', ['run', 'dev', '--ui=stream'], {
      stdio: 'ignore',
      env: {
        ...process.env,
        DATABASE_URL: databaseUrl
      }
    })

    await waitForServer('http://localhost:3001')

    console.log('🧪 Running tests...')

    const cy = spawn('bun', [mode === 'ci' ? 'cypress:run' : 'cypress:open'], {
      stdio: 'inherit',
      env: {
        ...process.env,
        DATABASE_URL: databaseUrl
      }
    })
    const exitCode = await new Promise<number>((resolve, reject) => {
      cy.on('error', reject)

      cy.on('exit', (code) => {
        resolve(code ?? 1)
      })
    })

    process.exitCode = exitCode
  } catch (error) {
    console.error('❌ E2E failed:', error)
    process.exitCode = 1
  } finally {
    console.log('🧹 Cleaning up processes and containers...')

    if (postgres) {
      await postgres.stop()
    }
    if (next) {
      next.kill()
    }
    console.log('✅ Cleanup complete')
  }
}

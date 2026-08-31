import { defineConfig } from 'cypress'
import dotenv from 'dotenv'

export default defineConfig({
  allowCypressEnv: false,
  projectId: '3t3142',

  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(_, config) {
      const envResult = dotenv.config({ path: './apps/web/.env.test' })
      if (envResult.error) {
        throw envResult.error
      }

      config.env = {
        ...config.env,
        ...envResult.parsed
      }

      return config
    }
  }
})

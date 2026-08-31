import { defineConfig } from 'cypress'

export default defineConfig({
  allowCypressEnv: false,
  projectId: '3t3142',

  e2e: {
    baseUrl: 'http://localhost:3001'
  },
  expose: {
    environment: 'staging'
  }
})

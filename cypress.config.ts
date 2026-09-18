import fs from 'node:fs'
import path from 'node:path'

import AdmZip from 'adm-zip'
import { defineConfig } from 'cypress'
import mammoth from 'mammoth'
import XLSX from 'xlsx'

export default defineConfig({
  allowCypressEnv: false,
  projectId: '3t3142',

  e2e: {
    baseUrl: 'http://localhost:3001',
    setupNodeEvents(on, config) {
      on('before:browser:launch', (_, launchOptions) => {
        const downloadsFolder = path.join(config.projectRoot, 'cypress', 'downloads')
        if (fs.existsSync(downloadsFolder)) {
          fs.rmSync(downloadsFolder, { recursive: true, force: true })
        }
        return launchOptions
      })

      on('task', {
        readZip(zipPath: string) {
          const zip = new AdmZip(zipPath)

          const entries = zip.getEntries().filter((entry) => !entry.isDirectory)

          return entries.map((entry) => ({
            name: entry.entryName,
            size: entry.header.size
          }))
        },

        readExcelFromZip({ zipPath, filename }: { zipPath: string; filename: string }) {
          const zip = new AdmZip(zipPath)
          const entry = zip.getEntry(filename)

          if (!entry) {
            throw new Error(`File "${filename}" not found in ZIP`)
          }

          const workbook = XLSX.read(entry.getData(), {
            type: 'buffer'
          })

          return workbook.SheetNames.map((sheetName) => {
            const sheet = workbook.Sheets[sheetName]

            if (!sheet) {
              throw new Error(`Sheet "${sheetName}" not found in workbook`)
            }

            return {
              name: sheetName,
              data: XLSX.utils.sheet_to_json(sheet, {
                header: 1
              })
            }
          })
        },

        async readDocxFromZip({ zipPath, filename }: { zipPath: string; filename: string }) {
          const zip = new AdmZip(zipPath)
          const entry = zip.getEntry(filename)

          if (!entry) {
            throw new Error(`File "${filename}" not found in ZIP`)
          }

          const result = await mammoth.extractRawText({
            buffer: entry.getData()
          })

          return result.value
        }
      })
    }
  }
})

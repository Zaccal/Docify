import type { generateMockData } from './utils/generate-mock-data'
import { getExpectedExcelData } from './utils/get-expected-excel-data'

type MockDocumentData = ReturnType<typeof generateMockData> & { documentAddress?: string }

export function validateZip(filepath: string, mockData: MockDocumentData) {
  cy.task('readZip', filepath).then((files) => {
    expect(files).to.have.length(4)
    const filenames = files.map((file) => file.name)
    const docxFiles = filenames.filter((name) => name.endsWith('.docx'))

    const excelFiles = filenames.filter((name) => name.endsWith('.xlsx'))

    expect(docxFiles).to.have.length(1)
    expect(excelFiles).to.have.length(3)
    validateExcelFiles(filepath, excelFiles, mockData)
    validateDocxFile(filepath, docxFiles[0]!, mockData)
  })
}

function validateExcelFiles(
  filepath: string,
  filenames: string[],
  mockData: ReturnType<typeof generateMockData>
) {
  const expectedContent = getExpectedExcelData(mockData)

  for (const filename of filenames) {
    cy.task('readExcelFromZip', { zipPath: filepath, filename }).then((sheets) => {
      const excelSheets = sheets as ExcelSheet[]

      expect(excelSheets.length).to.be.greaterThan(0)

      const content = excelSheets
        .flatMap((sheet) => sheet.data)
        .flatMap((row) => row)
        .filter((cell) => cell !== null && cell !== undefined)
        .join(' ')
        .replace(/\s+/g, ' ')
        .replace(/["'«»]/g, '')
        .toLowerCase()

      cy.log(`Checking ${filename}`)

      expect(content).not.to.include('undefined')

      const fileConfig = expectedContent.find((config) => filename.startsWith(config.filename))

      assert.exists(fileConfig, `No expected data config for ${filename}`)

      for (const value of fileConfig!.values) {
        if (value === null || value === undefined) {
          continue
        }
        const normalizedValue = String(value)
          .replace(/["'«»]/g, '')
          .replace(/\s+/g, ' ')
          .toLowerCase()
        expect(content, `Expected "${value}" in ${filename}`).to.include(normalizedValue)
      }
    })
  }
}

function validateDocxFile(filepath: string, filename: string, mockData: MockDocumentData) {
  cy.task('readDocxFromZip', { zipPath: filepath, filename }).then((text) => {
    const content = text as string

    cy.log(`Checking ${filename}`)

    expect(content.toLowerCase()).not.to.include('undefined')

    const expectedValues = [
      mockData.enumeration,
      mockData.fullnameClient,
      mockData.clientIdNumber,
      mockData.clientIdDateFrom,
      mockData.clientIdType,
      mockData.iin,
      mockData.organization,
      mockData.city,
      mockData.address
    ]

    for (const value of expectedValues) {
      expect(content).to.include(value)
    }

    if (mockData.documentAddress) {
      expect(content, 'Selected document address in the lease agreement').to.include(
        mockData.documentAddress
      )
    }
  })
}

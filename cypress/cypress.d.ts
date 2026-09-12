type ZipFile = {
  name: string
  size: number
}

type ExcelSheet = {
  name: string
  data: unknown[][]
}

declare namespace Cypress {
  interface Chainable {
    task(
      event: 'readZip',
      arg: string,
      options?: Partial<Loggable & Timeoutable>
    ): Chainable<ZipFile[]>

    task(
      event: 'readExcelFromZip',
      arg: {
        zipPath: string
        filename: string
      },
      options?: Partial<Loggable & Timeoutable>
    ): Chainable<ExcelSheet[]>
  }
}

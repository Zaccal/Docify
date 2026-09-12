import type { generateMockData } from './utils/generate-mock-data'

export function fillCreateDocumentForm(data: ReturnType<typeof generateMockData>) {
  // Document
  cy.get('[data-testid="enumeration-input"]').type(data.enumeration)
  cy.get('#date-picker-range').click()
  cy.get('[role="gridcell"]').contains('10').click()
  cy.get('[role="gridcell"]').contains('15').click()
  cy.get('#date-picker-range').should('have.value', data.documentDate)
  cy.get('#date-picker-range').click()

  // Client
  typeInput('fullnameClient', data.fullnameClient)
  typeInput('clientIdNumber', data.clientIdNumber)
  typeInput('clientIdDateFrom', data.clientIdDateFrom)
  typeInput('clientIdType', data.clientIdType)
  typeInput('iin', data.iin)
  typeInput('costPerDay', data.costPerDay)

  // Organization
  typeInput('organization', data.organization)
  typeInput('bin', data.bin)
  typeInput('city', data.city)
  typeInput('index', data.index)
  typeInput('address', data.address)
  typeInput('kbe', data.kbe)
  typeInput('knp', data.knp)

  // Bank
  typeInput('bank', data.bank)
  typeInput('iik', data.iik)
  typeInput('bik', data.bik)

  // Dynamic cells
  data.dynamicCell.forEach((cell, index) => {
    cy.get('[data-testid="addCell-btn"]').click()
    cy.get(`[data-testid="cellsLineKeys[${index}]"]`).type(cell.key)
    cy.get(`[data-testid="cellsLineValues[${index}]"]`).type(cell.value)
  })
}

function typeInput(name: string, value: string | number) {
  cy.get(`[data-testid="${name}-input"]`).type(String(value))
}

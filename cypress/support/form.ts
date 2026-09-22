import type { generateMockData } from './utils/generate-mock-data'

export function fillCreateDocumentForm(data: ReturnType<typeof generateMockData>) {
  // Document
  cy.get('[data-testid="enumeration-input"]').type(data.enumeration)
  cy.get('#date-picker-range').click()
  cy.get('[role="gridcell"]').contains('10').click()
  cy.get('[role="gridcell"]').contains('15').click()
  cy.get('#date-picker-range').should('have.value', data.documentDate)
  cy.get('#date-picker-range').click()
  // Closing the calendar restores focus; wait before typing into the next field.
  cy.get('[data-slot="popover-content"]').should('not.exist')

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

  cy.get('[data-testid="fullnameClient-input"]').should('have.value', data.fullnameClient)
}

function typeInput(name: string, value: string | number) {
  cy.get(`[data-testid="${name}-input"]`).type(String(value))
}

export function checkCreateDocumentFormValues(data: ReturnType<typeof generateMockData>) {
  // Document
  cy.get('[data-testid="enumeration-input"]').should('have.value', '')
  cy.get('#date-picker-range').should('have.value', 'Выберите период')

  // Client
  checkInput('fullnameClient')
  checkInput('clientIdNumber')
  checkInput('clientIdDateFrom')
  checkInput('clientIdType')
  checkInput('iin')
  checkInput('costPerDay')

  // Organization
  checkInput('organization')
  checkInput('bin')
  checkInput('city')
  checkInput('index')
  checkInput('address')
  checkInput('kbe')
  checkInput('knp')

  // Bank
  checkInput('bank')
  checkInput('iik', 'KZ')
  checkInput('bik')

  // Dynamic cells
  data.dynamicCell.forEach((_, index) => {
    cy.get(`[data-testid="cellsLineKeys[${index}]"]`).should('not.exist')
    cy.get(`[data-testid="cellsLineValues[${index}]"]`).should('not.exist')
  })
}

function checkInput(name: string, expectedValue = '') {
  cy.get(`[data-testid="${name}-input"]`).should('have.value', expectedValue)
}

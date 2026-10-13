import { COOKIE_NAME } from '../../../apps/web/src/features/auth/lib/constant'
import { fillCreateDocumentForm } from '../../support/form'
import { generateMockData } from '../../support/utils/generate-mock-data'

type DocumentData = ReturnType<typeof generateMockData>

function checkDocumentSaved() {
  cy.wait('@downloadDocument', { timeout: 15000 }).its('response.statusCode').should('eq', 200)
  cy.get('[data-testid="save-btn"]').should('be.enabled')
  cy.get('[data-slot="field-error"], [data-testid="error-message"]').should('not.exist')
}

function createDocument(data: DocumentData) {
  fillCreateDocumentForm(data)
  cy.get('[data-testid="save-btn"]').click()
  cy.wait('@documentAction').its('response.statusCode').should('eq', 200)
  checkDocumentSaved()
  cy.get('[data-testid="reset-btn"]').click()
}

function loadDocument(data: DocumentData) {
  cy.get('input[placeholder="Выполняйте поиск по имени клиента или номеру документа..."]')
    .clear()
    .type(data.enumeration)

  cy.contains('li', `№${data.enumeration} ·`)
    .should('be.visible')
    .and('contain.text', data.fullnameClient)
    .click()

  cy.get('[data-testid="existing-document-search-notice"]').should('be.visible')
  cy.get('[data-testid="enumeration-input"]').should('have.value', data.enumeration)
  cy.get('[data-testid="fullnameClient-input"]').should('have.value', data.fullnameClient)
  cy.get('[data-testid="iin-input"]').should('have.value', data.iin)
  cy.get('input[name="costPerDay"]').should('have.value', data.costPerDay)
}

describe('Document Enumeration Swap', () => {
  let currentDocument: DocumentData
  let conflictingDocument: DocumentData
  let updatedCostPerDay: string

  beforeEach(() => {
    currentDocument = generateMockData()
    conflictingDocument = {
      ...generateMockData(),
      // Guarantee distinct numbers while respecting the four-character database column.
      enumeration: String((Number(currentDocument.enumeration) + 1) % 10000).padStart(4, '0')
    }
    updatedCostPerDay = String(Number(currentDocument.costPerDay) + 1000)

    cy.env(['AUTH_SECRET']).then(({ AUTH_SECRET }) => {
      cy.setCookie(COOKIE_NAME, AUTH_SECRET)
    })

    cy.intercept('POST', '/create-document').as('documentAction')
    cy.intercept({ method: 'GET', pathname: '/api/documents/generate/*' }).as('downloadDocument')
    cy.visit('/create-document')

    createDocument(currentDocument)
    createDocument(conflictingDocument)
    loadDocument(currentDocument)

    cy.get('[data-testid="enumeration-input"]').clear().type(conflictingDocument.enumeration)
    cy.get('[data-testid="costPerDay-input"]').clear().type(updatedCostPerDay)
    cy.get('[data-testid="save-btn"]').click()
    cy.wait('@documentAction').its('response.statusCode').should('eq', 200)

    cy.get('[role="alertdialog"]')
      .should('be.visible')
      .within(() => {
        cy.contains('Поменять номера документов?').should('be.visible')
        cy.contains('button', 'Отмена').should('be.enabled')
        cy.contains('button', 'Подтвердить').should('be.enabled')
      })
  })

  it('swaps both document numbers and saves pending edits after confirmation', () => {
    cy.get('[role="alertdialog"]').contains('button', 'Подтвердить').click()

    cy.get('[role="alertdialog"]').should('not.exist')
    checkDocumentSaved()
    cy.get('[data-testid="enumeration-input"]').should(
      'have.value',
      conflictingDocument.enumeration
    )
    cy.get('input[name="costPerDay"]').should('have.value', updatedCostPerDay)

    // Reload and search both records to verify persisted values, not just local form state.
    cy.reload()
    loadDocument({
      ...currentDocument,
      enumeration: conflictingDocument.enumeration,
      costPerDay: updatedCostPerDay
    })
    loadDocument({
      ...conflictingDocument,
      enumeration: currentDocument.enumeration
    })
  })

  it('keeps both document numbers and saved values unchanged when cancelled', () => {
    cy.get('[role="alertdialog"]').contains('button', 'Отмена').click()

    cy.get('[role="alertdialog"]').should('not.exist')
    cy.get('[data-testid="save-btn"]').should('be.enabled')
    cy.get('[data-testid="enumeration-input"]').should(
      'have.value',
      conflictingDocument.enumeration
    )
    cy.get('input[name="costPerDay"]').should('have.value', updatedCostPerDay)

    cy.reload()
    loadDocument(currentDocument)
    loadDocument(conflictingDocument)
  })
})

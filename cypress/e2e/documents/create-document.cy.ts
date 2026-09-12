import { COOKIE_NAME } from '../../../apps/web/src/features/auth/lib/constant'
import { validateZip } from '../../support/document-validation'
import { fillCreateDocumentForm } from '../../support/form'
import { generateMockData } from '../../support/utils/generate-mock-data'

describe('Create Document Flow', () => {
  beforeEach(() => {
    cy.env(['AUTH_SECRET']).then(({ AUTH_SECRET }) => {
      cy.setCookie(COOKIE_NAME, AUTH_SECRET)
    })

    cy.visit('/create-document')
    cy.intercept('POST', '*').as('createDocumentAction')
  })

  describe('UI Elements & Functionality', () => {
    it('Select company', () => {
      cy.get('[data-testid="company-select-value"]').should('have.text', 'XANSHA')
      cy.get('[data-testid="template-select"]').should('be.visible')
      cy.get('[data-testid="company-select-value"]').click()
      cy.get('[data-testid="company-select-value-XANSHA"]').should('be.visible')
      cy.get('[data-testid="company-select-value-NomadDocs"]').should('be.visible')

      cy.get('[data-testid="company-select-value-NomadDocs"]').click()
      cy.get('[data-testid="company-select-value"]').should('have.text', 'NomadDocs')
      cy.get('[data-testid="template-select"]').should('not.exist')

      cy.get('[data-testid="company-select-value"]').click()
      cy.get('[data-testid="company-select-value-XANSHA"]').click()
      cy.get('[data-testid="company-select-value"]').should('have.text', 'XANSHA')
    })

    it('Select template', () => {
      cy.get('[data-testid="template-select"]').should('be.visible')
      cy.get('[data-testid="template-select"]').click()
      cy.get('[data-testid="template-select-item-APARTMENT"]').should('be.visible')
      cy.get('[data-testid="template-select-item-HOTEL"]').should('be.visible')

      cy.get('[data-testid="template-select-item-APARTMENT"]').should('have.text', 'Квартирная')
      cy.get('[data-testid="template-select-item-HOTEL"]').should('have.text', 'Гостиничный')

      cy.get('[data-testid="template-select-item-HOTEL"]').click()
      cy.get('[role="option"]').should('contain.text', 'Гостиничный')

      cy.get('[data-testid="template-select"]').click()
      cy.get('[data-testid="template-select-item-APARTMENT"]').should('have.text', 'Квартирная')
    })

    it('should work with dynamic cells', () => {
      cy.get('[data-testid="addCell-btn"]').should('be.visible')
      cy.get('[data-testid="addCell-btn"]').click()
      cy.get('[data-testid="cellsLineCells[0]"]').should('be.visible')
      cy.get('[data-testid="deleteCell[0]-btn"]').should('be.visible')
      cy.get('[data-testid="deleteCell[0]-btn"]').click()
      cy.get('[data-testid="cellsLineCells[0]"]').should('not.exist')
    })
  })

  describe('Creating Document With Valid Data', () => {
    const MOCK_DATA = generateMockData()

    it('should create a document', () => {
      fillCreateDocumentForm(MOCK_DATA)

      // Save Button
      cy.get('[data-testid="save-btn"]').click()
      cy.wait('@createDocumentAction').its('response.statusCode').should('eq', 200)

      cy.get('[data-testid="password-error"]').should('not.exist')
      cy.get('[data-testid="error-message"]').should('not.exist')

      cy.get('[data-sonner-toast]', { timeout: 10000 }).should('be.visible')

      // Check download
      const filename = `Документы ${MOCK_DATA.fullnameClient}.zip`
      const filepath = `cypress/downloads/${filename}`

      cy.readFile(filepath, { timeout: 15000 }).should('exist')
      cy.readFile(filepath).should('have.length.gt', 0)

      validateZip(filepath, MOCK_DATA)
    })
  })
})

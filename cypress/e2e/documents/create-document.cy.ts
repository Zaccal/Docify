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
      cy.get('[data-testid="company-select-value"]', { timeout: 10000 }).should(
        'have.text',
        'XANSHA'
      )
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
      cy.get('[data-testid="template-select"]', { timeout: 10000 }).should('be.visible')
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
    it('should create a document', () => {
      const MOCK_DATA = generateMockData()

      fillCreateDocumentForm(MOCK_DATA)

      // Save Button
      cy.get('[data-testid="save-btn"]').click()
      cy.wait('@createDocumentAction').its('response.statusCode').should('eq', 200)

      cy.get('[data-testid="password-error"]').should('not.exist')
      cy.get('[data-testid="error-message"]').should('not.exist')

      // Target the Sonner toast container and specific toast item
      cy.get('[data-sonner-toaster]').find('[data-sonner-toast]').should('exist')

      // Check download
      const filename = `Документы ${MOCK_DATA.fullnameClient}.zip`
      const filepath = `cypress/downloads/${filename}`

      cy.readFile(filepath, { timeout: 15000 }).should('exist')
      cy.readFile(filepath).should('have.length.gt', 0)

      validateZip(filepath, MOCK_DATA)
    })

    it('hould search & update an existing document', () => {
      const INITIAL_MOCK_DATA = generateMockData()
      const UPDATE_MOCK_DATA = generateMockData()

      fillCreateDocumentForm(INITIAL_MOCK_DATA)
      cy.get('[data-testid="save-btn"]').click()
      cy.wait('@createDocumentAction').its('response.statusCode').should('eq', 200)
      cy.get('[data-sonner-toaster]').find('[data-sonner-toast]').should('exist')

      cy.get('[data-testid="password-error"]').should('not.exist')
      cy.get('[data-testid="error-message"]').should('not.exist')

      const initialFilename = `Документы ${INITIAL_MOCK_DATA.fullnameClient}.zip`
      const initialFilepath = `cypress/downloads/${initialFilename}`
      cy.readFile(initialFilepath, { timeout: 15000 }).should('exist').and('have.length.gt', 0)
      validateZip(initialFilepath, INITIAL_MOCK_DATA)

      cy.get('input[placeholder="Выполняйте поиск по имени клиента или номеру документа..."]')
        .clear()
        .type(INITIAL_MOCK_DATA.fullnameClient)

      cy.contains('li', INITIAL_MOCK_DATA.fullnameClient).should('be.visible').click()

      cy.get('[data-testid="existing-document-search-notice"]').should('be.visible')

      cy.get('[data-testid="enumeration-input"]').clear().type(UPDATE_MOCK_DATA.enumeration)
      cy.get('[data-testid="fullnameClient-input"]').clear().type(UPDATE_MOCK_DATA.fullnameClient)
      cy.get('[data-testid="clientIdNumber-input"]').clear().type(UPDATE_MOCK_DATA.clientIdNumber)
      cy.get('[data-testid="clientIdDateFrom-input"]')
        .clear()
        .type(UPDATE_MOCK_DATA.clientIdDateFrom)
      cy.get('[data-testid="clientIdType-input"]').clear().type(UPDATE_MOCK_DATA.clientIdType)
      cy.get('[data-testid="iin-input"]').clear().type(UPDATE_MOCK_DATA.iin)
      cy.get('[data-testid="costPerDay-input"]').clear().type(UPDATE_MOCK_DATA.costPerDay)

      cy.get('[data-testid="save-btn"]').click()
      cy.wait('@createDocumentAction').its('response.statusCode').should('eq', 200)

      cy.get('[data-testid="password-error"]').should('not.exist')
      cy.get('[data-testid="error-message"]').should('not.exist')
      cy.get('[data-sonner-toaster]').find('[data-sonner-toast]').should('exist')

      const updatedFilename = `Документы ${UPDATE_MOCK_DATA.fullnameClient}.zip`
      const updatedFilepath = `cypress/downloads/${updatedFilename}`
      cy.readFile(updatedFilepath, { timeout: 15000 }).should('exist').and('have.length.gt', 0)

      validateZip(updatedFilepath, {
        ...INITIAL_MOCK_DATA,
        enumeration: UPDATE_MOCK_DATA.enumeration,
        fullnameClient: UPDATE_MOCK_DATA.fullnameClient,
        clientIdNumber: UPDATE_MOCK_DATA.clientIdNumber,
        clientIdDateFrom: UPDATE_MOCK_DATA.clientIdDateFrom,
        clientIdType: UPDATE_MOCK_DATA.clientIdType,
        iin: UPDATE_MOCK_DATA.iin,
        costPerDay: UPDATE_MOCK_DATA.costPerDay
      })
    })
  })
})

import { COOKIE_NAME } from '../../../apps/web/src/features/auth/lib/constant'
import { validateZip } from '../../support/document-validation'
import { checkCreateDocumentFormValues, fillCreateDocumentForm } from '../../support/form'
import { generateMockData } from '../../support/utils/generate-mock-data'

const DOCUMENT_ADDRESSES = [
  'Сарыарка д 6 кв 1',
  'Сарыарка д 6 кв 4',
  'Сарыарка 6 кв 12',
  'Сарыарка д 14 кв 9',
  'Сарыарка д 1 кв 7',
  'Сарыарка д 1 кв 5'
] as const

function checkDocumentCreated() {
  cy.get('form').should(($form) => {
    const errors = $form
      .find('[data-slot="field-error"], [data-testid="error-message"]')
      .toArray()
      .map((element) => element.textContent?.trim())

    expect(errors, 'Document form errors').to.deep.equal([])
  })

  cy.wait('@downloadDocument', { timeout: 15000 }).its('response.statusCode').should('eq', 200)
  cy.get('[data-testid="save-btn"]').should('be.enabled')
}

describe('Create Document Flow', () => {
  beforeEach(() => {
    cy.env(['AUTH_SECRET']).then(({ AUTH_SECRET }) => {
      cy.setCookie(COOKIE_NAME, AUTH_SECRET)
    })

    cy.intercept('POST', '/create-document').as('createDocumentAction')
    cy.intercept({ method: 'GET', pathname: '/api/documents/generate/*' }).as('downloadDocument')
    cy.visit('/create-document')
  })

  describe('UI Elements & Functionality', () => {
    it('Select company', () => {
      cy.get('[data-testid="company-select-value"]', { timeout: 10000 }).should(
        'have.text',
        'XANSHA'
      )
      cy.get('[data-testid="template-select"]').should('be.visible')
      cy.get('[data-testid="document-address-select"]').should('be.visible')
      cy.get('[data-testid="company-select-value"]').closest('[data-slot="select-trigger"]').click()
      cy.get('[data-testid="company-select-value-XANSHA"]').should('be.visible')
      cy.get('[data-testid="company-select-value-NomadDocs"]').should('be.visible')

      cy.get('[data-testid="company-select-value-NomadDocs"]').click()
      cy.get('[data-testid="company-select-value"]').should('have.text', 'NomadDocs')
      cy.get('[data-testid="template-select"]').should('not.exist')
      cy.get('[data-testid="document-address-select"]').should('not.exist')

      cy.get('[data-testid="company-select-value"]').closest('[data-slot="select-trigger"]').click()
      cy.get('[data-testid="company-select-value-XANSHA"]').click()
      cy.get('[data-testid="company-select-value"]').should('have.text', 'XANSHA')
      cy.get('[data-testid="document-address-select"]')
        .should('be.visible')
        .and('have.text', DOCUMENT_ADDRESSES[0])
    })

    it('should select each document address', () => {
      cy.get('[data-testid="document-address-select"]', { timeout: 10000 })
        .should('be.visible')
        .and('have.text', DOCUMENT_ADDRESSES[0])

      DOCUMENT_ADDRESSES.forEach((address) => {
        cy.get('[data-testid="document-address-select"]').click()
        cy.get('[data-testid^="document-address-select-item-"]').should(
          'have.length',
          DOCUMENT_ADDRESSES.length
        )
        cy.get(`[data-testid="document-address-select-item-${address}"]`)
          .should('have.text', address)
          .click()
        cy.get('[data-testid="document-address-select"]').should('have.text', address)
        cy.get('input[name="documentAddress"]').should('have.value', address)
        cy.get('[data-slot="select-content"]').should('not.be.visible')
      })
    })

    it('Select template', () => {
      cy.get('[data-testid="template-select"]', { timeout: 10000 }).should('be.visible')
      cy.get('[data-testid="template-select"]').click()
      cy.get('[data-testid="template-select-item-APARTMENT"]').should('be.visible')
      cy.get('[data-testid="template-select-item-HOTEL"]').should('be.visible')

      cy.get('[data-testid="template-select-item-APARTMENT"]').should('have.text', 'Квартирная')
      cy.get('[data-testid="template-select-item-HOTEL"]').should('have.text', 'Гостиничный')

      cy.get('[data-testid="template-select-item-HOTEL"]').click()
      cy.get('[data-testid="template-select"]').should('contain.text', 'Гостиничный')
      cy.get('[data-slot="select-content"]').should('not.be.visible')

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

    it('should clear form fields when clicked on the reset button', () => {
      const MOCK_DATA = generateMockData()
      fillCreateDocumentForm(MOCK_DATA)
      cy.get('[data-testid="document-address-select"]').click()
      cy.get(`[data-testid="document-address-select-item-${DOCUMENT_ADDRESSES[1]}"]`).click()
      cy.get('[data-slot="select-content"]').should('not.be.visible')
      cy.get('[data-testid="document-address-select"]').should('have.text', DOCUMENT_ADDRESSES[1])
      cy.get('[data-testid="reset-btn"]').click()

      checkCreateDocumentFormValues(MOCK_DATA)
      cy.get('[data-testid="document-address-select"]').should('have.text', DOCUMENT_ADDRESSES[0])
      cy.get('input[name="documentAddress"]').should('have.value', DOCUMENT_ADDRESSES[0])
    })
  })

  describe('Creating Document With Valid Data', () => {
    it('should create a document', () => {
      const MOCK_DATA = {
        ...generateMockData(),
        documentAddress: DOCUMENT_ADDRESSES[0]
      }

      fillCreateDocumentForm(MOCK_DATA)

      // Save Button
      cy.get('[data-testid="save-btn"]').click()
      cy.wait('@createDocumentAction').its('response.statusCode').should('eq', 200)

      checkDocumentCreated()

      // Check download
      const filename = `Документы ${MOCK_DATA.fullnameClient}.zip`
      const filepath = `cypress/downloads/${filename}`

      cy.readFile(filepath, { timeout: 15000 }).should('exist')
      cy.readFile(filepath).should('have.length.gt', 0)

      validateZip(filepath, MOCK_DATA)
    })

    for (const template of ['APARTMENT', 'HOTEL']) {
      it(`should create a ${template} document with the selected document address`, () => {
        const MOCK_DATA = {
          ...generateMockData(),
          documentAddress: DOCUMENT_ADDRESSES[3]
        }

        fillCreateDocumentForm(MOCK_DATA)
        cy.get('[data-testid="template-select"]').click()
        cy.get(`[data-testid="template-select-item-${template}"]`).click()
        cy.get('[data-slot="select-content"]').should('not.be.visible')
        cy.get('[data-testid="document-address-select"]').click()
        cy.get(`[data-testid="document-address-select-item-${MOCK_DATA.documentAddress}"]`).click()
        cy.get('[data-slot="select-content"]').should('not.be.visible')
        cy.get('[data-testid="document-address-select"]').should(
          'have.text',
          MOCK_DATA.documentAddress
        )

        cy.get('[data-testid="save-btn"]').click()
        cy.wait('@createDocumentAction').its('response.statusCode').should('eq', 200)
        checkDocumentCreated()

        const filepath = `cypress/downloads/Документы ${MOCK_DATA.fullnameClient}.zip`
        cy.readFile(filepath, { timeout: 15000 }).should('have.length.gt', 0)
        validateZip(filepath, MOCK_DATA)
      })
    }

    it('should create a new document with NomadDocs company', () => {
      // Should display NomadDocs as the selected company
      cy.get('[data-testid="company-select-value"]', { timeout: 10000 }).should(
        'have.text',
        'XANSHA'
      )
      cy.get('[data-testid="template-select"]').should('be.visible')
      cy.get('[data-testid="company-select-value"]').closest('[data-slot="select-trigger"]').click()
      cy.get('[data-testid="company-select-value-XANSHA"]').should('be.visible')
      cy.get('[data-testid="company-select-value-NomadDocs"]').should('be.visible')

      cy.get('[data-testid="company-select-value-NomadDocs"]').click()
      cy.get('[data-testid="company-select-value"]').should('have.text', 'NomadDocs')

      const MOCK_DATA = generateMockData()

      fillCreateDocumentForm(MOCK_DATA)

      // Save Button
      cy.get('[data-testid="save-btn"]').click()
      cy.wait('@createDocumentAction').its('response.statusCode').should('eq', 200)

      checkDocumentCreated()

      // Check download
      const filename = `Документы ${MOCK_DATA.fullnameClient}.zip`
      const filepath = `cypress/downloads/${filename}`

      cy.readFile(filepath, { timeout: 15000 }).should('exist')
      cy.readFile(filepath).should('have.length.gt', 0)

      validateZip(filepath, MOCK_DATA)
    })

    it('should search & update an existing document', () => {
      const INITIAL_MOCK_DATA = {
        ...generateMockData(),
        documentAddress: DOCUMENT_ADDRESSES[1]
      }
      const UPDATE_MOCK_DATA = {
        ...generateMockData(),
        documentAddress: DOCUMENT_ADDRESSES[5]
      }

      fillCreateDocumentForm(INITIAL_MOCK_DATA)
      cy.get('[data-testid="document-address-select"]').click()
      cy.get(
        `[data-testid="document-address-select-item-${INITIAL_MOCK_DATA.documentAddress}"]`
      ).click()
      cy.get('[data-slot="select-content"]').should('not.be.visible')
      cy.get('[data-testid="save-btn"]').click()
      cy.wait('@createDocumentAction')
        .its('response.statusCode')
        .should('be.oneOf', [200, 201, 301])
      checkDocumentCreated()

      const initialFilename = `Документы ${INITIAL_MOCK_DATA.fullnameClient}.zip`
      const initialFilepath = `cypress/downloads/${initialFilename}`
      cy.readFile(initialFilepath, { timeout: 15000 }).should('exist').and('have.length.gt', 0)
      validateZip(initialFilepath, INITIAL_MOCK_DATA)

      cy.get('input[placeholder="Выполняйте поиск по имени клиента или номеру документа..."]')
        .clear()
        .type(INITIAL_MOCK_DATA.fullnameClient)

      cy.contains('li', INITIAL_MOCK_DATA.fullnameClient).should('be.visible').click()

      cy.get('[data-testid="existing-document-search-notice"]').should('be.visible')
      cy.get('[data-testid="document-address-select"]').should(
        'have.text',
        INITIAL_MOCK_DATA.documentAddress
      )

      cy.get('[data-testid="document-address-select"]').click()
      cy.get(
        `[data-testid="document-address-select-item-${UPDATE_MOCK_DATA.documentAddress}"]`
      ).click()
      cy.get('[data-slot="select-content"]').should('not.be.visible')

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
      cy.wait('@createDocumentAction')
        .its('response.statusCode')
        .should('be.oneOf', [200, 201, 301])

      checkDocumentCreated()

      const updatedFilename = `Документы ${UPDATE_MOCK_DATA.fullnameClient}.zip`
      const updatedFilepath = `cypress/downloads/${updatedFilename}`
      cy.readFile(updatedFilepath, { timeout: 15000 }).should('exist').and('have.length.gt', 0)

      validateZip(updatedFilepath, {
        ...INITIAL_MOCK_DATA,
        documentAddress: UPDATE_MOCK_DATA.documentAddress,
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

  describe('Error Handling', () => {
    it('should show field validation errors when submitted with invalid data', () => {
      fillCreateDocumentForm(generateMockData())

      const invalidFields = [
        {
          name: 'enumeration',
          value: '123',
          message: 'Длина должна быть не менее 4 символов'
        },
        {
          name: 'fullnameClient',
          value: 'John Smith',
          message:
            'Укажите ФИО в формате "Иванов И.И."; фамилия и инициалы должны быть на кириллице'
        },
        {
          name: 'clientIdNumber',
          value: '123',
          message: 'Номер удостоверения личности РК должен состоять из 9 цифр'
        },
        {
          name: 'clientIdDateFrom',
          value: '31.02.2024',
          message: 'Дата выдачи удостоверения должна быть корректной календарной датой'
        },
        {
          name: 'iin',
          value: '123',
          message: 'ИИН Казахстана должен состоять из 12 цифр'
        },
        {
          name: 'costPerDay',
          value: '0',
          message: 'Стоимость должна быть больше 0'
        },
        {
          name: 'bin',
          value: '123',
          message: 'БИН Казахстана должен состоять из 12 цифр'
        },
        {
          name: 'iik',
          value: 'KZ123',
          message: 'ИИК должен быть IBAN Казахстана: KZ и еще 18 букв или цифр'
        }
      ]

      invalidFields.forEach(({ name, value }) => {
        cy.get(`[data-testid="${name}-input"]`).clear().type(value)
      })

      cy.get('[data-testid="save-btn"]').click()
      cy.wait('@createDocumentAction').its('response.statusCode').should('eq', 200)

      invalidFields.forEach(({ name, value, message }) => {
        cy.get(`[data-testid="${name}-input"]`)
          .should('have.value', value)
          .and('have.attr', 'aria-invalid', 'true')
          .closest('[data-slot="field"]')
          .find('[role="alert"]')
          .should('be.visible')
          .and('contain.text', message)
      })
    })

    it('Can not create document with existing data', () => {
      const MOCK_DATA = generateMockData()

      fillCreateDocumentForm(MOCK_DATA)

      // Save Button
      cy.get('[data-testid="save-btn"]').click()
      cy.wait('@createDocumentAction').its('response.statusCode').should('eq', 200)

      checkDocumentCreated()

      // Check download
      const filename = `Документы ${MOCK_DATA.fullnameClient}.zip`
      const filepath = `cypress/downloads/${filename}`

      cy.readFile(filepath, { timeout: 15000 }).should('exist')
      cy.readFile(filepath).should('have.length.gt', 0)

      validateZip(filepath, MOCK_DATA)

      // Try to recreate the document with the same data
      const SECOND_MOCK_DATA = generateMockData()
      cy.get('[data-testid="reset-btn"]').click()

      fillCreateDocumentForm(SECOND_MOCK_DATA)

      cy.get('[data-testid="enumeration-input"]').clear().type(MOCK_DATA.enumeration)
      cy.get('[data-testid="enumeration-input"]').should('have.value', MOCK_DATA.enumeration)

      // Save Button
      cy.get('[data-testid="save-btn"]').click()
      cy.wait('@createDocumentAction').its('response.statusCode').should('eq', 200)

      cy.get('[data-testid="error-message"]').should('exist')
    })
  })
})

describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.intercept('POST', '/').as('loginAction')
  })

  describe('Valid page', () => {
    it('it should be on the right page', () => {
      cy.location('pathname').should('eq', '/')
    })

    it('it should display the login form', () => {
      cy.get('[data-testid="login-form"]').should('exist')
      cy.get('[data-testid="password-field"]').should('exist')
      cy.get('[data-testid="password-button"]').should('exist')
      cy.get('[data-testid="login-button"]').should('exist')
    })
  })

  describe('Login logic', () => {
    it('toggles password visibility correctly', () => {
      cy.get('[data-testid="password-field"]').should('have.attr', 'type', 'password')

      cy.get('[data-testid="password-button"]').click()
      cy.get('[data-testid="password-field"]').should('have.attr', 'type', 'text')

      cy.get('[data-testid="password-button"]').click()
      cy.get('[data-testid="password-field"]').should('have.attr', 'type', 'password')
    })

    it('submits the login form with incorrect credentials', () => {
      const INCORECT_CREDENTIALS = 'INCORRECT'
      cy.get('[data-testid="password-field"]').type(INCORECT_CREDENTIALS)
      cy.get('[data-testid="login-button"]').click()
      cy.wait('@loginAction')

      cy.get('[data-testid="password-error"]').should('exist')
      cy.get('[data-testid="password-error"]').should('contain', 'Неверный пароль')
    })

    it('submits the login form with empty credentials', () => {
      cy.get('[data-testid="login-button"]').click()
      cy.wait('@loginAction')

      cy.get('[data-testid="password-error"]').should('exist')
      cy.get('[data-testid="password-error"]').should('contain', 'Введите пароль')
    })

    it('submits the login form with correct credentials', () => {
      cy.env(['PASSWORD']).then(({ PASSWORD }) => {
        cy.get('[data-testid="password-field"]').type(PASSWORD)
        cy.get('[data-testid="login-button"]').click()

        cy.wait('@loginAction').its('response.statusCode').should('eq', 303)

        cy.get('[data-testid="password-error"]').should('not.exist')

        cy.url().should('include', '/dashboard')
      })
    })
  })
})

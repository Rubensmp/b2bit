describe('SigninPage', () => {
  it('renders elements on screen', () => {
    cy.visit('http://localhost:3000/signin')

    cy.get('[data-testid="logo-cypress"]').should('exist')
    cy.get('[data-testid="email-form-cypress"]').should('exist')
    cy.get('[data-testid="password-form-cypress"]').should('exist')
    cy.get('[data-testid="actionButtonId"]').should('exist')
  })

    // cy.get('.text-red').should('contain', 'E-mail ou senha inválido');
  it('trigger required errors', () => {
    cy.visit('http://localhost:3000/signin')

    cy.get('[data-testid="actionButtonId"]').click()
    cy.get('.text-red').should('contain', 'Campo obrigatório');
  })

  it('trigger request error', () => {
    const invalidLogin = {email: "invalid@gmail.com", password: "123456"}

    cy.visit('http://localhost:3000/signin')
    cy.get('[data-testid="email-form-cypress"]').type(invalidLogin.email).should('have.value', invalidLogin.email)
    cy.get('[data-testid="password-form-cypress"]').type(invalidLogin.password).should('have.value', invalidLogin.password)
    cy.get('[data-testid="actionButtonId"]').click()
    cy.get('[data-testid="loadingId"]').should('exist')
    cy.get('[data-testid="actionButtonId"]').should('contain', 'Sign In');
    cy.get('.text-red').should('contain', 'E-mail ou senha inválido');
  })

  it('sucess signin', () => {
    cy.visit('http://localhost:3000/signin')

    cy.get('[data-testid="email-form-cypress"]').type(Cypress.env('email'))
    cy.get('[data-testid="password-form-cypress"]').type('password')
    cy.get('[data-testid="actionButtonId"]').click()

    cy.location('pathname').should('eq', '/')
  });
})


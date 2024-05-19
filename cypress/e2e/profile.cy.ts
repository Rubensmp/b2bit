describe('template spec', () => {
  beforeEach(() => {
    cy.intercept('GET', '/auth/profile/', {
      statusCode: 200,
      body: {
        name: 'Ipsum Lorem',
        avatar: 'https://placehold.co/60x60/',
        email: 'loremipsum@gmail.com',
      },
    }).as('getUserProfile');
    
    cy.visit('http://localhost:3000/profile');
    localStorage.setItem('accessToken', 'fakeAccessToken');

  });

  it('renders elements on screen', () => {
    cy.get('[data-testid="loadingId"]').should('exist')
    cy.get('[data-testid="tittle-cypress"]').should('exist').should('contain', 'Profile picture')
    cy.get('[data-testid="avatar-cypress"]').should('exist')
    cy.get('[data-testid="name-cypress"]').should('exist').should('contain', 'Your Name')
    cy.get('[data-testid="userName-cypress"]').should('exist').should('contain', 'Ipsum Lorem')
    cy.get('[data-testid="email-cypress"]').should('exist').should('contain', 'Your E-mail')
    cy.get('[data-testid="userEmail-cypress"]').should('exist').should('contain', 'loremipsum@gmail.com')
  });

  it('should logout and redirect to signin page', () => {
    cy.get('button').contains('Logout').click();
    cy.location('pathname').should('eq', '/signin')
  });
})
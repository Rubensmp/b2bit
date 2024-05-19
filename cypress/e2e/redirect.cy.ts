describe('template spec', () => {
  it('should redirect to /signin', () => {
    cy.visit('http://localhost:3000/profile')
    cy.location('pathname').should('eq', '/signin')
  });

  it('if authenshould redirect to /signin', () => {
    cy.intercept('GET', '/auth/profile/', {
      statusCode: 200,
      body: {
        name: 'Ipsum Lorem',
        avatar: 'https://placehold.co/60x60/',
        email: 'loremipsum@gmail.com',
      },
    }).as('getUserProfile');
    
    localStorage.setItem('accessToken', 'fakeAccessToken');
    cy.visit('http://localhost:3000/profile');

    cy.location('pathname').should('eq', '/profile')
    
    cy.get('[data-testid="userName-cypress"]').should('exist').should('contain', 'Ipsum Lorem')
    cy.get('[data-testid="userEmail-cypress"]').should('exist').should('contain', 'loremipsum@gmail.com')
  });
})
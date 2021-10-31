describe('Home', () => {
    it('should navigate to the Home page', () => {
      // Start from the index page
      cy.visit('http://localhost:3000/')
  
      // base URL should be
      cy.url().should('include', '/')
    })
  })
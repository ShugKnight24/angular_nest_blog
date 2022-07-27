describe('Register Page', () => {

	it('should load the register page successfully', () => {
		cy.visit('/register');
	});

	it('should display the register form', () => {
		cy.get('form').should('have.length', 1);
	});

});
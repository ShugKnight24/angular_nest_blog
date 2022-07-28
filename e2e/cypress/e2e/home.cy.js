describe('Home Page / base url', () => {

	it('should load the home page successfully', () => {
		cy.visit('/');
	});

	it('should contain four buttons in the top nav', () => {
		cy.get('.mat-toolbar-row').find('button').should('have.length', 4);
		cy.contains('Admin');
		cy.contains('Login');
		cy.contains('Register');
		cy.contains('Users');
	});

});

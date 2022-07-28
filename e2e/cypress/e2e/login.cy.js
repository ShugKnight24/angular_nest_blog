import {
	ADMIN_PASS,
	ADMIN_USER
} from '../constants';

describe('Test login flow', () => {

	it('should load successfully', () => {
		cy.visit('/login');
	});

	it('should log in the user successfully', () => {
		cy.visit('/login');
		cy.get('[formcontrolname="email"]').type(ADMIN_USER);
		cy.get('[formcontrolname="password"]').type(ADMIN_PASS);
		cy.get('[type="submit"]').click();

		// TODO: Update this once differentiated between admin and regular users
		cy.url().should('include', '/admin');
	});

});

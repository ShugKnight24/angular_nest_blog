import {
	ADMIN_PASS,
	ADMIN_USER
} from '../constants';

describe('Users Page', () => {

	before(() => {
		cy.clearLocalStorageSnapshot();
	});

	beforeEach(() => {
		cy.restoreLocalStorage();
	});

	it('should login with an admin user, should properly save blog token to local storage, switch to users page, and load the users successfully', () => {
		cy.visit('/login');
		cy.get('[formcontrolname="email"]').type(ADMIN_USER);
		cy.get('[formcontrolname="password"]').type(ADMIN_PASS);
		cy.get('[type="submit"]').click();

		// TODO: Update this once differentiated between admin and regular users
		cy.url().should('include', '/admin');
		cy.visit('/users');
		cy.get('.mat-table');
		cy.saveLocalStorage();
	});

	it('should display the column names', () => {
		cy.contains('Id');
		cy.contains('Name');
		cy.contains('Username');
		cy.contains('Email');
		cy.contains('Role');
	});

	it('should be able to navigate to the next page', () => {
		cy.get('[aria-label="Next page"]').click();
	});

	it('should be able to filter by username', () => {
		cy.get('[placeholder="Search Username"]').type('shug');
		cy.get('[type="submit"]').click();
		cy.get('mat-table').find('mat-row').its('length').should('be.gte', 1);
	});

});

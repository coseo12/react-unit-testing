/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

describe('Habit tracker', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders', () => {
    cy.findByText('Habit Tracker').should('exist');
  });

  it('Add new habit at the end', () => {
    cy.findByPlaceholderText('Habit').type('New Habit');
    cy.findByText('Add').click();
    cy.findAllByTestId('habit-name').last().should('have.text', 'New Habit');
    cy.findAllByTestId('habit-count').last().should('have.text', '0');
  });

  it('increases count', () => {
    cy.findAllByTitle('increase').first().click();
    cy.findAllByTestId('habit-count').first().should('have.text', '1');
  });

  it('decreases count', () => {
    cy.findAllByTitle('increase').first().click();
    cy.findAllByTitle('decrease').first().click();
    cy.findAllByTestId('habit-count').first().should('have.text', '0');
  });

  it('does not decreases below 0', () => {
    cy.findAllByTitle('decrease').first().click();
    cy.findAllByTestId('habit-count').first().should('have.text', '0');
  });

  it('shows active count on the header', () => {
    cy.findAllByTitle('increase').first().click();
    cy.findAllByTitle('increase').last().click();
    cy.findByTestId('navbar-count').should('have.text', '2');
  });

  it('reset to - when clicking reset all', () => {
    cy.findAllByTitle('increase').first().click();
    cy.findAllByTitle('increase').last().click();
    cy.findByText('Reset All').click();
    cy.findAllByTestId('habit-count').each((item) => {
      cy.wrap(item).should('have.text', '0');
    });
  });

  it('delets an item', () => {
    cy.findAllByTitle('delete').first().click();
    cy.findAllByTestId('habit-name').findByText('Reading').should('not.exist');
  });
});

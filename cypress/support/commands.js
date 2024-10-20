Cypress.Commands.add('loginmantis', () => {
    cy.clearCookies()
    cy.visit('https://mantis-prova.base2.com.br')
    cy.get('#username').type('inserir_login')
    cy.get('.width-40').click()
    cy.get('#password').type('inserir_senha', { log: false })
    cy.get('[type="submit"]').click()
})

Cypress.Commands.add('logoutmantis', () => {
    cy.get('.fa-angle-down').click()
    cy.get('.user-menu > :nth-child(4) > a').click()
})

import 'cypress-file-upload';

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
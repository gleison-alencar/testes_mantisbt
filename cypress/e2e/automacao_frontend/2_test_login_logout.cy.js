/// <reference types="cypress" />

describe('Realiza o login no MantisBT e realiza o logout', () => {

    beforeEach(() => {
      cy.loginmantis(); // Comando de login customizado
      cy.wait(5000)
    });
  
    it('Deve exibir o título correto após login e realizar o logout', () => {
      // Verifica se o título da página é o esperado
      cy.title().should('be.equal', 'Minha Visão - MantisBT');
    });
  
    it('Deve realizar logout corretamente', () => {
      // Realiza o logout
      cy.logoutmantis();
  
      // Verifica se a página de login é exibida após logout
      cy.url().should('include', '/login_page.php');
    });
  });
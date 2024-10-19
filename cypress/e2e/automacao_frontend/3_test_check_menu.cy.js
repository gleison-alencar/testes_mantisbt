/// <reference types="cypress" />

describe('Acessa MantisBT', () => {
  
    beforeEach(() => {
      cy.loginmantis(); // Realiza o login antes de cada teste
      cy.wait(10000)
    });
  
    afterEach(() => {
      cy.logoutmantis(); // Realiza o logout após cada teste
    });
  
    it('Verifica menus do MantisBT', () => {
      // Acessa o menu "Ver tarefas"
      cy.get('#sidebar-btn > .ace-icon').click();
      cy.get('#sidebar > .nav > :nth-child(2) > a').click();
      cy.get('#bug_action > .widget-box > .widget-header > .widget-title').should('be.visible');
  
      // Acessa o menu "Criar tarefas"
      cy.get(':nth-child(3) > a > .menu-icon').click();
      cy.get('.widget-title').should('be.visible').and('contain.text', 'Digite os Detalhes do Relatório');
  
      // Acessa o menu "Registros de mudanças"
      cy.get(':nth-child(4) > a > .menu-icon').click();
      cy.get('.lead').should('be.visible').and('contain.text', 'Não há informações disponíveis sobre registros de mudanças');
  
      // Acessa o menu "Planejamento"
      cy.get('.nav > :nth-child(5) > a').click();
      cy.get('.lead').should('be.visible').and('contain.text', 'Nenhuma informação disponível Roadmap');
    });
  });
  
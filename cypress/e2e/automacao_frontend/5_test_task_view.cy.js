/// <reference types="cypress" />

describe('Acessa MantisBT e manipula uma task', () => {

    beforeEach(() => {
        cy.loginmantis(); // Realiza login
        // Espera explícita devido a alguns atrasos após o login
        cy.wait(3000); 
        cy.get('#sidebar-btn > .ace-icon', { timeout: 10000 }).click();
      });

  afterEach(() => {
    cy.logoutmantis(); // Realiza o logout após cada teste
    cy.reload;
  });

  it('Realiza busca e adições em uma task', () => {
    // Abre o menu lateral e acessa "Ver tarefas"
    cy.get('#sidebar > .nav > :nth-child(2) > a').click();

    // Verifica a presença do filtro
    cy.get('#filter > .widget-header > .widget-title').should('be.visible');

    // Inicia uma busca por task específica
    cy.get('.form-inline > .btn-group > .btn').click();
    cy.get('#filter-search-txt').type('0001828');
    cy.wait(1000); // Espera explícita para garantir a busca

    cy.get('.btn-toolbar > .form-inline > .btn').click();
    cy.wait(1000);

    // Seleciona a task na lista de resultados
    cy.get('.inline > .lbl').click();
    cy.wait(1000);
    cy.get('tbody > tr > .column-id > a').click();

    // Adiciona uma anotação na task
    cy.get('#bugnote_text').type('Acionando uma nova anotação no card automatizado');

    // Verifica e realiza o upload de arquivo
    cy.get('.dropzone').should('not.have.value');
    cy.get('.dropzone').attachFile('example.json', { subjectType: 'drag-n-drop' });

    // Submete a anotação
    cy.get('.widget-toolbox > .btn').click();

    // Espera para garantir que a submissão foi processada
    cy.wait(5000);

    // Verificação condicional: sucesso ou erro. O erro "APPLICATION ERROR #27" acontece quando atinge o maximo de tentativas
    cy.get('body').then(($body) => {
        // Verifica se existe a mensagem de erro
        if ($body.find('.alert-danger').length > 0) {
          cy.get('.alert-danger')
            .should('be.visible')
            .and('contain.text', 'APPLICATION ERROR #27');
        } 
      });
    
  });
})

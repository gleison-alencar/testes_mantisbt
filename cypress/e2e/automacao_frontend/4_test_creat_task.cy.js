/// <reference types="cypress" />

describe('Realiza criação de uma nova tarefa', () => {

  beforeEach(() => {
    cy.loginmantis(); // Realiza login
    // Espera explícita devido a alguns atrasos após o login
    cy.wait(3000); 
    cy.get('.hidden-sm > .btn-group > .btn', { timeout: 10000 }).click();
  });

  afterEach(() => {
    cy.logoutmantis(); // Realiza o logout após cada teste
  });

  it('Preenche a categoria e cria uma nova tarefa', () => {
    // Seleciona a categoria
    cy.wait(2000);
    cy.get('#category_id').select('[Todos os Projetos] categoria teste').should('have.value', '2');

    // Seleciona opções de reprodutibilidade, severidade e prioridade
    cy.get('#reproducibility').select('sempre');
    cy.wait(1000); // Pequena espera para garantir estabilidade

    cy.get('#severity').select('trivial');
    cy.get('#priority').select('alta');

    // Preenche o resumo e descrição da tarefa
    cy.get('input[id="summary"]').type('Teste de criação de card automatizado');
    cy.get('#description').type('Página do google quebrando tentar realizar uma pesquisa por imagem,', { delay: 0 });

    // Preenche os passos para reproduzir o erro
    cy.get('#steps_to_reproduce')
      .type('Acesse a página do google (https://www.google.com/);{enter}', { delay: 0 })
      .type('Selecione por pesquisa por imagem;{enter}', { delay: 0 })
      .type('O erro XXXXXX será apresentado.', { delay: 0 });

    // Adiciona informações adicionais
    cy.get('#additional_info').type('A situação não ocorre quando utilizado aba anônima', { delay: 0 });

    // Adiciona tags
    cy.get('input[id="tag_string"]').type('bug,mecontrata,bluetooth');
    cy.get('#tag_select').select('tag2');
    cy.wait(1000); // Espera adicional antes de selecionar a próxima tag
    cy.get('#tag_select').select('tagTest2');

    // Verifica o campo de upload de arquivos e anexa um arquivo
    cy.get('.dropzone').should('not.have.value');
    cy.get('.dropzone').attachFile('example.json', { subjectType: 'drag-n-drop' });

    // Marca uma opção no formulário
    cy.get(':nth-child(2) > .lbl').click();

    // Submete a tarefa
    cy.get('.widget-toolbox > .btn').click();

    // Espera explícita para garantir o tempo de resposta após submissão
    cy.wait(5000);

    // Verificação condicional: sucesso ou erro. O erro "APPLICATION ERROR #27" acontece quando atinge o maximo de tentativas
    cy.get('body').then(($body) => {
        if ($body.find('.alert-success').length > 0) {
          cy.get('.alert-success')
            .should('be.visible')
            .and('contain.text', 'Operação realizada com sucesso');
        } else if ($body.find('.alert-danger').length > 0) {
          cy.get('.alert-danger')
            .should('be.visible')
            .and('contain.text', 'APPLICATION ERROR #27');
        } else {
          throw new Error('Nenhuma mensagem de sucesso ou erro encontrada!');
        }
      });
    });
  });
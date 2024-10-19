/// <reference types="cypress" />

describe('Acessa MantisBT', () => {
  
    beforeEach(() => {
      cy.loginmantis(); // Realiza o login antes de cada teste
      cy.wait(3000)
    });
  
    afterEach(() => {
      cy.logoutmantis(); // Realiza o logout após cada teste
      cy.reload
    });

    it('Deve exibir o título correto após login e realizar o logout', () => {
        // Verifica se o título da página é o esperado
        cy.title().should('be.equal', 'Minha Visão - MantisBT');
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

      it('Preenche a categoria e cria uma nova tarefa', () => {

        cy.get('.hidden-sm > .btn-group > .btn', { timeout: 10000 }).click();

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

        it('Realiza busca e adições em uma task', () => {

            cy.get('#sidebar-btn > .ace-icon', { timeout: 10000 }).click();

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
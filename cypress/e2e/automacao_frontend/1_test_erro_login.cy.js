  /// <reference types="cypress" />

  describe('Erro ao logar', () => {
    const url = 'https://mantis-prova.base2.com.br'; // URL externa para reutilização
  
    it('Deve exibir erro ao fazer login com credenciais inválidas', () => {
      cy.visit(url);
  
      // Preencher o campo de usuário
      cy.get('#username').should('be.visible').type('aasdasdsdas');
  
      // Clicar no botão de continuar
      cy.get('.width-40').should('be.enabled').click();
  
      // Preencher o campo de senha (log oculto)
      cy.get('#password').should('be.visible').type('adsadassda_fas', { log: false });
  
      // Submeter o formulário de login
      cy.get('[type="submit"]').should('be.enabled').click();
  
      // Verificar a mensagem de erro
      cy.get('.alert-danger > p')
        .should('be.visible')
        .and('contain.text', 'Sua conta pode estar desativada ou bloqueada ou o nome de usuário e a senha que você digitou não estão corretos.');
    });
  });
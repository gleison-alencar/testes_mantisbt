const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implementar ouvintes de eventos do node aqui
    },
    
    viewportHeight: 880,
    viewportWidth: 1280,
  },
});

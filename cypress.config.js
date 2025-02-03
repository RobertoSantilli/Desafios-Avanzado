const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  watchForFileChanges: false,
  baseUrl: 'https://pushing-it.vercel.app/',
  fixturesFolder: 'cypress/fixtures',
  defaultCommandTimeout: 10000,
  env: {
    user: 'pushingit',
    password: '123456!',
    token: null
  }
  },
  
});

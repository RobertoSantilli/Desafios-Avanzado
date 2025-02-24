const { defineConfig } = require("cypress");
const { Client } = require('pg');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        async connectDB(query) {
          const client = new Client({
            user: "pushingit",
            password: "UnLDfSFGcmD8plOIL59ZJ5mANrAYlsqK",
            host: "dpg-curn2kq3esus73dqpksg-a.oregon-postgres.render.com",
            database: "pushingit_i1qy",
            ssl: true,
            port: 5432,
          })
          await client.connect();
          const res = await client.query(query);
          await client.end();
          return res.rows
        }
      })
      // implement node event listeners here
    },
  watchForFileChanges: false,
  baseUrl: 'https://pushing-it.vercel.app/',
  fixturesFolder: 'cypress/fixtures',
  defaultCommandTimeout: 10000,
  requestTimeout: 60000,
  responseTimeout: 60000,
  pageLoadTimeout: 60000,
  env: {
    user: 'pushingit',
    password: '123456!',
    token: null,
    base_url_api: 'https://pushing-it-3.onrender.com/api'
  }
  },
  
});

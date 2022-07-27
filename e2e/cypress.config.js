const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    "baseUrl": "http://localhost:4200",
    setupNodeEvents(on, config) {
      require("cypress-localstorage-commands/plugin")(on, config);
      return config;
    },
  },
});

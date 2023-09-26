import { environments } from './cypress/e2e/model/environments'
const { defineConfig } = require("cypress");

const fs = require('fs');
const path = require('path');

function getUrl(environment: string) {
  if (environment == environments.PROD.name) console.log("Base URL: " + environments.PROD.url);
}

function getConfigurationByFile(file) {

  getUrl(file);

  const pathToConfigFile = path.resolve('./cypress', 'environments', `${file}.json`);

  let rawdata = fs.readFileSync(pathToConfigFile);

  return JSON.parse(rawdata);
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);

      const file = process.env.environment || 'prod';

      return getConfigurationByFile(file);
    },
    "specPattern": "**/*.spec.*",
    "chromeWebSecurity": false,
    "numTestsKeptInMemory": 1,
    "blockHosts": [
      "www.google-analytics.com",
      "stats.g.doubleclick.net",
      "id5-sync.com",
      "bam.nr-data.net"
    ],
    "reporter": "cypress-mochawesome-reporter",
    "reporterOptions": {
      "reportDir": "cypress/reports",
      "charts": true,
      "reportPageTitle": "DEMO-UNITY",
      "embeddedScreenshots": true,
      "inlineAssets": true
    },
    "viewportWidth": 1536,
    "viewportHeight": 960,
    "retries": {
      "runMode": 1,
      "openMode": 0
    },
    "includeShadowDom": true
  },
});

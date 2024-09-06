import { defineConfig } from 'cypress';
import mochawesome from 'cypress-mochawesome-reporter/plugin';
import codeCoverage from '@cypress/code-coverage/task';

export default defineConfig({
  e2e: {
    supportFile: 'cypress/support/e2e.ts',
    baseUrl: 'http://localhost:4321',
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      reporterEnabled: 'mocha-junit-reporter, cypress-mochawesome-reporter',
      mochaJunitReporterReporterOptions: {
        mochaFile: 'cypress/results/junit-report.xml',
        toConsole: true,
      },
      cypressMochawesomeReporterReporterOptions: {
        reportDir: 'cypress/results',
        overwrite: true,
        html: true,
        json: true,
      },
    },
    setupNodeEvents(on, config) {
      mochawesome(on);
      codeCoverage(on, config);
      return config;
    },    
  }
})
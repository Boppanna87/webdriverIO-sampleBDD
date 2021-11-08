const { generate } = require('multiple-cucumber-html-reporter');
const { removeSync } = require('fs-extra');
const cucumberJson  = require('wdio-cucumberjs-json-reporter');
const {uri, feature, scenario, step, result} = require('cucumber');
const branch = process.env.BRANCH || 'develop';

exports.config = {

  runner: 'local',
  serverUrls: {
    sample: 'https://testscriptdemo.com',
   
  },

  specs: [
    './tests/acceptance/wdio/features/page_validations/sample.feature',
  ],
  exclude: [],
  maxInstances: 5,
  capabilities: [{
    maxInstances: 1,
    browserName: 'chrome',
    acceptInsecureCerts: true,
    unhandledPromptBehavior: 'accept',
    'goog:chromeOptions': {
      args: ['--disable-gpu',
        '--disable-web-security',
        '--ignore-certificate-errors',
        '--window-size=1024x768',
      ],
    },
  }],
  strictSSL: false,
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 30000,
  connectionRetryTimeout: 30000,
  connectionRetryCount: 3,
  services: ['chromedriver'],
  framework: 'cucumber',
  reporters: [['cucumberjs-json', {
    jsonFolder: 'tests/reports/output/json/',
    language: 'en',
  },
  ],
  ],
  cucumberOpts: {
    require: ['./tests/acceptance/wdio/step_definitions/*.js'],
    requireModule: [
      '@babel/register',
    ],
    backtrace: false,
    dryRun: false,
    failFast: false,
    format: ['json'],
    snippets: true,
    source: true,
    profile: [],
    strict: false,
    tagExpression: '',
    timeout: 90000,
    ignoreUndefinedDefinitions: false,
  },

  before () {
    require('expect-webdriverio').setOptions({ wait: 60000, interval: 500 })
  },

  afterStep: function afterStep({uri, feature, step},
    context, {error, result, duration, passed, retries,scenario}) {
    console.log("logging Error : "+error);
    console.log("logging pass : "+{passed}.passed);
    if ({passed}.passed === false) {
      console.log('Test Failed');
      console.log("Failed feature file path: "+JSON.stringify(uri));
      console.log("logging Error : "+{error}.error);

      const cucumberJson = require('wdio-cucumberjs-json-reporter').default;
      cucumberJson.attach(browser.takeScreenshot(), 'image/png');
    }
  },


  afterScenario: function (uri, feature, scenario, result, sourceLocation) {
    // console.log("logging scenario : "+JSON.stringify(scenario));
    console.log("logging result1 : "+JSON.stringify(result.status));
    if ((JSON.stringify(result.status)).includes("failed")) {
      console.log('Scenario Failed');
      const cucumberJson = require('wdio-cucumberjs-json-reporter').default;
      cucumberJson.attach(browser.takeScreenshot(), 'image/png');
    }
  },

  onPrepare: () => {
    removeSync('tests/reports/');
  },

  onComplete: () => {
    generate({
      reportName: 'BDD Report',
      jsonDir: 'tests/reports/output/json/',
      reportPath: 'tests/reports/output/report/',
      openReportInBrowser: true,
      hideMetadata: true,
      displayDuration: true,
      displayReportTime: true,
    });
  },
};

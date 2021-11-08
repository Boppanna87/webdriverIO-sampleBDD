const {generate} = require('multiple-cucumber-html-reporter');
const {removeSync} = require('fs-extra');
const cucumberJson = require('wdio-cucumberjs-json-reporter');
const {uri, feature, scenario, step, result} = require('cucumber');

exports.config = {

    serverUrls: {
        lloydsib: '${Lloyds_URI}',
        bosib: '${BOS_URI}',
        halifaxib: '${Halifax_URI}',
        lloydsmca: '${LloydsMCA_URI}',
        bosmca: '${BOSMCA_URI}',
        halifaxmca: '${HalifaxMCA_URI}',
    },

    hostname: "localhost",
    port: 4445,
    path: '/wd/hub',

    specs: [
        './tests/acceptance/wdio/features/page_validations/summary_page_validations.feature',
        './tests/acceptance/wdio/features/page_validations/travel_insurance_page_validation.feature',
        './tests/acceptance/wdio/features/page_validations/vehicle_breakdown_cover_page_validations.feature',
        './tests/acceptance/wdio/features/page_validations/mobile_insurance_page_validations.feature',
        './tests/acceptance/wdio/features/page_validations/home_emergency_cover_page_validations.feature',
        './tests/acceptance/wdio/features/page_validations/before_we_start_page_validation.feature',
        './tests/acceptance/wdio/features/page_validations/e2e-sole-account-holders.feature'
    ],
    exclude: [],
    maxInstances: 4,
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        unhandledPromptBehavior: 'accept',
        "goog:chromeOptions": {
            args: ["--disable-gpu",
                "--disable-web-security",
                "--ignore-certificate-errors",
                "--window-size=1024x768",
            ],
        },
    }],
    strictSSL: false,
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 30000,
    connectionRetryTimeout: 30000,
    connectionRetryCount: 3,
    framework: 'cucumber',
    reporters: [['cucumberjs-json', {
        jsonFolder: 'tests/reports/output/json/',
        language: 'en',
    }
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
        ignoreUndefinedDefinitions: false
    },

    before () {
        require('expect-webdriverio').setOptions({ wait: 60000, interval: 500 })
    },

    afterStep: function afterStep({uri, feature, step},
        context, {error, result, duration, passed, retries}) {
        if ({passed}.passed === false) {
            console.log('Test Failed');
            console.log("Failed feature file path: "+JSON.stringify(uri));
            console.log("logging TestFailure Error : "+{error}.error);

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
            displayReportTime: true
        });
    }
};

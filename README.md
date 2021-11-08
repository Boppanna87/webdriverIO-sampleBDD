# BDD Tests

This is the bdd tests for this cwa repo and uses webdriverio v6. This will be upgraded to the recently released v7 of the webdriverio once the other related node modules comp[atible with v7 are also released.

#### Node version:
This project requires node 12.x or above. Please check your current version and upgrade if needed. Current version can be found via the following command:
`node --version`

- On Windows machine, download and install node v12 from [https://nodejs.org/en/download/releases/]()
- On Mac, use nvm to install or switch between different node versions. If node v12 is not installed, use command `nvm install v12 && use v12`. If node v12 is already installd, start using it by executing the following command `nvm use v12`


#### Change npm registery to support Lloyds systems

To download dependencies on Lloyds machine, the registry needs to be set to point to the Lloyds Nexus artifactory by executing the below command. Note this will change your npm config globally.

`npm config set registry  http://nexus.banking.sbx.zone/repository/npm-master/`



#### Execute tests in local machine:

- On the terminal, change to the webdriverIO-sample directory of this project
- Execute command `npm i` to download and install all required dependencies 
- Set required feature file name to execute, in the spec field in the `local.conf.js` file located in the conf directory (tests/acceptance/wdio/conf)
- Execute the following command to run the tests (change branch name to desired branch to run against):  `npm run BDDLocal`
- Html report will be generated in the `tests/reports/` directory and opened in a browser at the end of test execution

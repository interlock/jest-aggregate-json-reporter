const fs = require('fs');
const readPkg = require('read-pkg');
const path = require('path');

module.exports = (testResults) => {
  const testResultsString = JSON.stringify(testResults);

  const packagedData = readPkg.sync(process.cwd())
  const config = packagedData.jestJsonReporter || {};

  const outputFile = config.outputFile || process.env.JSON_REPORTER_OUTPUT || './test-results.json';

  fs.writeFile(outputFile, testResultsString, (err) => {
    if (err) {
      console.warn('Unable to write test results JSON', err);
    }
  });

  return testResults;
};

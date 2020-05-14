import {writeFile } from 'fs';
import readPkg = require('read-pkg');
import { Test, TestResult, AggregatedResult, Reporter, Context } from "@jest/reporters";
import { Config, Global } from "@jest/types";


export default class JsonReporter implements Reporter{
  _globalConfig: Config.GlobalConfig;
  _options: Config.DefaultOptions;

  constructor(globalConfig: Config.GlobalConfig, options: Config.DefaultOptions) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  // onRunStart() {  }

  // onTestStart() { }

  // getLastError() { }

  // onTestResult(test: Test,
  //   testResult: TestResult,
  //   aggregatedResult: AggregatedResult,
  // ) {

  // }

  onRunComplete(contexts: Set<Context>, results: AggregatedResult) {
    // console.log('Custom reporter output:');
    // console.log('GlobalConfig: ', this._globalConfig);
    // console.log('Options: ', this._options);
    // console.log('Results:', results);

    const packagedData = readPkg.sync();
    // const config = packagedData?.jestJsonReporter || {};
    const config = {
      outputFile: undefined
    };
    const testResultsString = JSON.stringify(results);

    const outputFile = config.outputFile || process.env.JSON_REPORTER_OUTPUT || './test-results.json';

    writeFile(outputFile, testResultsString, (err) => {
      if (err) {
        console.warn('Unable to write test results JSON', err);
      }
    });
  }
}

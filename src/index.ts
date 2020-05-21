import { writeFileSync } from 'fs';
import readPkg = require('read-pkg-up');
import { Test, TestResult, AggregatedResult, Reporter, Context } from "@jest/reporters";
import { Config } from "@jest/types";

export default class JsonReporter implements Reporter {
  _globalConfig: Config.GlobalConfig;
  _options: Config.DefaultOptions;

  constructor(globalConfig: Config.GlobalConfig, options: Config.DefaultOptions) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onRunStart() {  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTestStart() { }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getLastError() { }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  onTestResult(test: Test, testResult: TestResult, aggregatedResult: AggregatedResult) { }

  onRunComplete(contexts: Set<Context>, results: AggregatedResult) {
    const packagedData = readPkg.sync({cwd: process.cwd()});
    const config = {
      outputFile: packagedData?.packageJson?.jestAggregateJsonReporter || process.env.JSON_AGGREGATE_REPORTER_OUTPUT || './test-results.json'
    };
    const testResultsString = JSON.stringify(results);

    const outputFile = config.outputFile;

    writeFileSync(outputFile, testResultsString);
  }
}

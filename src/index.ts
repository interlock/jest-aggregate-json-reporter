import { writeFileSync } from 'fs';
import readPkg = require('read-pkg-up');
import { Test, TestResult, AggregatedResult, Reporter, Context } from "@jest/reporters";
import { Config } from "@jest/types";

export type JsonAggregateReport = {
  testResults: TestResult[];
  aggregatedResult: AggregatedResult;
}

export function trimTestResult(testResult: TestResult) {
  testResult.coverage = undefined;
  testResult.sourceMaps = undefined;
}

export default class JsonAggregateReporter implements Reporter {
  _globalConfig: Config.GlobalConfig;
  _options: Config.DefaultOptions;

  _report: Partial<JsonAggregateReport>;

  constructor(globalConfig: Config.GlobalConfig, options: Config.DefaultOptions) {
    this._globalConfig = globalConfig;
    this._options = options;
    this._report = {
      testResults: []
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onRunStart() {  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTestStart() { }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getLastError() { }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onTestResult(test: Test, testResult: TestResult, aggregatedResult: AggregatedResult) {
    trimTestResult(testResult);
    this._report.testResults?.push(testResult);
  }

  onRunComplete(contexts: Set<Context>, results: AggregatedResult) {
    this._report.aggregatedResult = results;
    const packagedData = readPkg.sync({cwd: process.cwd()});
    const config = {
      outputFile: process.env.JSON_AGGREGATE_REPORTER_OUTPUT || packagedData?.packageJson?.jestAggregateJsonReporter  || './test-results.json'
    };
    const testResultsString = JSON.stringify(this._report);

    const outputFile = config.outputFile;

    writeFileSync(outputFile, testResultsString);
  }
}

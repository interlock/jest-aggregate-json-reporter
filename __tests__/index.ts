import { mocked } from 'ts-jest/utils'
import JestJsonReporter from '../src/index';
import * as fs from 'fs';
import * as path from 'path';
import * as readPkg from 'read-pkg-up';
import { makeEmptyAggregatedTestResult } from '@jest/test-result';
import * as jestConfig from "jest-config";
import { Config } from '@jest/types';

// pulled from jest-config
declare type ReadConfig = {
  configPath: Config.Path | null | undefined;
  globalConfig: Config.GlobalConfig;
  hasDeprecationWarnings: boolean;
  projectConfig: Config.ProjectConfig;
};

const STRINGIFIED_TEST_RESULTS = JSON.stringify(makeEmptyAggregatedTestResult());

function getParams() {
  return {
    outputFile: mocked(fs).writeFile.mock.calls[0][0],
    stringifiedTestResults: mocked(fs).writeFile.mock.calls[0][1],
  };
}

describe("write results", () => {

  let config: ReadConfig;
  let reporter: JestJsonReporter;

  beforeEach(async () => {
    jest.mock('fs');
    jest.mock('read-pkg-up');
    // const a: { [argName: string]: unknown; _: string[]; $0: string } = {_:[""], $0:""}
    // config = await jestConfig.readConfig(a, path.resolve(__dirname, '..'));
    // reporter = new JestJsonReporter(config.globalConfig, jestConfig.defaults);
  });

  test('asdf', async () => {
    mocked(fs).existsSync.mockReturnValue(true);
    const a: { [argName: string]: unknown; _: string[]; $0: string } = {_:[""], $0:""}
    config = await jestConfig.readConfig(a, path.resolve(__dirname, '..'));
    expect(1).toBe(1);
  });

  // test('Writes stringified results to "test-results.json" by default', () => {
  //   reporter.onRunComplete(new Set(), makeEmptyAggregatedTestResult());

  //   const { outputFile, stringifiedTestResults } = getParams();

  //   expect(outputFile).toEqual('./test-results.json');
  //   expect(stringifiedTestResults).toEqual(STRINGIFIED_TEST_RESULTS);

  //   mocked(fs).writeFile.mockClear();
  // });

  // test('Uses outputFile config value for output file', () => {
  //   const OTHER_NAME = 'other-name.json';

  //   mocked(readPkg).sync.mockReturnValue({packageJson: {jestJsonReporter: OTHER_NAME}, path: ''});

  //   reporter.onRunComplete(new Set(), makeEmptyAggregatedTestResult());

  //   const { outputFile, stringifiedTestResults } = getParams();

  //   expect(outputFile).toEqual(OTHER_NAME);
  //   expect(stringifiedTestResults).toEqual(STRINGIFIED_TEST_RESULTS);

  //   mocked(fs).writeFile.mockClear();
  // });
});



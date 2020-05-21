import { mocked } from 'ts-jest/utils'
import JestJsonReporter from '../index';
jest.mock('read-pkg-up');
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

const STRINGIFIED_TEST_RESULTS = JSON.stringify({testResults:[], aggregateResults: makeEmptyAggregatedTestResult()});
const TEST_RESULTS_JSON = path.resolve(__dirname, '../..', 'test-results.json');
const OTHER_NAME = 'other-name.json';
const OTHER_NAME_PATH = path.resolve(__dirname, '../..', OTHER_NAME);

function unlink(path: string) {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
}

describe("write results", () => {

  let config: ReadConfig;
  let reporter: JestJsonReporter;

  beforeEach(async () => {
    const a: { [argName: string]: unknown; _: string[]; $0: string } = {_:[""], $0:""}
    config = await jestConfig.readConfig(a, path.resolve(__dirname, '..'));
    reporter = new JestJsonReporter(config.globalConfig, jestConfig.defaults);
    unlink(TEST_RESULTS_JSON);
  });

  afterAll(() => {
    unlink(TEST_RESULTS_JSON);
    unlink(OTHER_NAME_PATH);
  });


  test('Writes stringified results to "test-results.json" by default', () => {
    reporter.onRunComplete(new Set(), makeEmptyAggregatedTestResult());

    expect(fs.existsSync(TEST_RESULTS_JSON)).toBeTruthy();
    expect(fs.readFileSync(TEST_RESULTS_JSON, {encoding: 'utf-8'})).toEqual(STRINGIFIED_TEST_RESULTS);
  });

  test('Uses outputFile config value for output file', () => {
    unlink(OTHER_NAME_PATH);
    mocked(readPkg).sync.mockReturnValue({packageJson: {jestAggregateJsonReporter: OTHER_NAME_PATH}, path: ''});

    reporter.onRunComplete(new Set(), makeEmptyAggregatedTestResult());

    expect(fs.existsSync(OTHER_NAME_PATH)).toBeTruthy();
    expect(fs.readFileSync(OTHER_NAME_PATH, {encoding: 'utf-8'})).toEqual(STRINGIFIED_TEST_RESULTS);
  });
});



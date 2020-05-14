import { mocked } from 'ts-jest/utils'
import jestJsonReporter from '../src/index';
import * as fs from 'fs';
import readPkg = require('read-pkg');
import { makeEmptyAggregatedTestResult } from '@jest/test-result';

jest.mock('fs');
jest.mock('read-pkg');


const STRINGIFIED_TEST_RESULTS = JSON.stringify(makeEmptyAggregatedTestResult());

function getParams() {
  return {
    // @ts-ignore
    outputFile: fs.writeFile.mock.calls[0][0],
    // @ts-ignore
    stringifiedTestResults: fs.writeFile.mock.calls[0][1],
  };
}

describe("write results", () => {
  test('Writes stringified results to "test-results.json" by default', () => {
    // @ts-ignore
    const reporter = new jestJsonReporter({}, {});
    reporter.onRunComplete(new Set(), makeEmptyAggregatedTestResult());

    const { outputFile, stringifiedTestResults } = getParams();

    expect(outputFile).toEqual('./test-results.json');
    expect(stringifiedTestResults).toEqual(STRINGIFIED_TEST_RESULTS);

    mocked(fs).writeFile.mockClear();
  });

  test('Uses outputFile config value for output file', () => {
    const OTHER_NAME = 'other-name.json';

    mocked(readPkg).sync.mockResolvedValue(() => ({
      jestJsonReporter: {
        outputFile: OTHER_NAME,
      }
    }))

    // @ts-ignore
    const reporter = new jestJsonReporter({}, {});
    reporter.onRunComplete(new Set(), makeEmptyAggregatedTestResult());

    const { outputFile, stringifiedTestResults } = getParams();

    expect(outputFile).toEqual(OTHER_NAME);
    expect(stringifiedTestResults).toEqual(STRINGIFIED_TEST_RESULTS);

    mocked(fs).writeFile.mockClear();
  });
});



# Jest JSON Reporter

![Node.js CI](https://github.com/interlock/jest-aggregate-json-reporter/workflows/Node.js%20CI/badge.svg)

JSON test aggregate results processor for Jest. Outputs the test results in JSON format as speified in the [jest documentation](http://facebook.github.io/jest/docs/configuration.html#testresultsprocessor-string) to a file called test-results.json (configurable)

This is a fork of [jest-json-reporter](https://github.com/Vall3y/jest-json-reporter)

## Setup

```
npm install --save-dev jest-aggregate-json-reporter
```

Then add to Jest config in the package.json

```
...
"jest": {
  "testResultsProcessor": "jest-aggregate-json-reporter"
},
...
```

## Configure

### output file name

By default, output file goes to test-results.json. You can configure it by adding a outputFile field under jestJsonReporter in your package.json file:

```
"jestAggregateJsonReporter": {
  "outputFile": "tests/results.json"
},
```


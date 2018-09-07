## Babel version
Only Babel 7 is supported. Check out ![babel-tape-runner](https://github.com/wavded/babel-tape-runner) for Babel 5 and 6 test runner

## Installation
```
npm i enhanced-tape-runner --save-dev
```

## Usage
Simply run the binary with one or multiple paths to your test directories/files:
```
node_modules/.bin/enhanced-tape-runner test test/things/index_test.js
```
This command does 3 things:
1. Enables Babel by requiring `@babel/polyfill` and `@babel/register`
2. Adds an `unhandledRejection` event listener to `process` which throws informative error on any unhandled promise rejection
3. Requires all files in `test` directory matching `test/**/_test.*` glob pattern and also requires `test/things/index_test.js`

You can suply a `--no-handle-rejections` option to this command to disable unhandledRejection event listener.

Example usage in shell script file:

```
#!/bin/bash

NODE_ENV=test node_modules/.bin/enhanced-tape-runner "$@" | node_modules/.bin/tap-spec
```

## License
MIT

module.exports = {
  plugins: ["jest"],
  env: {
    node: true,
    commonjs: true,
    es6: true,
    "jest/globals": true,
    mocha: true
  },
  extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    jest: true,
    mocha: true,
    service: true,
    request: true,
    expect: true
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error"
  }
};

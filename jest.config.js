const withNextJest = require('next/jest')({
  dir: '.',
});

/** @type {import("@jest/types").Config.InitialOptions} */
const config = {
  moduleNameMapper: {
    '^@site/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/e2e'],
};

module.exports = withNextJest(config);

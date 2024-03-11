/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/**/*.spec.ts"],
  verbose: true,
  forceExit: true,
  setupFiles: ['./jest.setup.js'],
};
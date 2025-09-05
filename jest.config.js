module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/server/tests/setup.js'],
  testMatch: ['**/server/tests/**/*.test.js'],
  verbose: true, // opcjonalnie: pełne raporty z testów
};

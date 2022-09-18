module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    "node_modules",
    "./src/api/users/users.controller.ts",
    "./src/api/transactions/transactions.controller.ts",
    "./src/shared/",
  ]
}
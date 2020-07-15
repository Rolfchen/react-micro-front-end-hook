module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest",
  },
  verbose: true,
  setupFilesAfterEnv: ["./setupTests.js"],
};

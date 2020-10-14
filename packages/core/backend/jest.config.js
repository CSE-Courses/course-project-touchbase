module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      diagnostics: false,
    },
  },
  setupFilesAfterEnv: ["./test/jest-setup.js"],
};

import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupJest.ts"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
    "^src/(.*)$": "<rootDir>/src/$1",
    "\\.(scss|css|sass)$": "identity-obj-proxy",
    "\\.(svg|jpg|png)$": "<rootDir>/__mocks__/fileMock.ts",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(svg)$": "<rootDir>/__mocks__/fileMock.ts",
  },
  testMatch: ["**/src/**/*.{spec,test}.{ts,tsx}"],
};

export default config;

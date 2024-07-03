import type { Config } from '@jest/types';

export default {
  rootDir: '.',
  moduleFileExtensions: ['ts', 'json', 'js'],
  testRegex: '.*\\.(e2e-spec|spec)\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  roots: ['<rootDir>/apps/', '<rootDir>/libs/'],
  moduleNameMapper: {
    '^@fiona/fiona(|/.*)$': '<rootDir>/libs/fiona/src/$1',
    '^@fiona/database(|/.*)$': '<rootDir>/libs/database/src/$1',
    '^@fiona/reidsmith(|/.*)$': '<rootDir>/libs/reidsmith/src/$1',
    '^@fiona/posts(|/.*)$': '<rootDir>/libs/posts/src/$1',
    '^@fiona/global(|/.*)$': '<rootDir>/libs/global/src/$1',
    '^@fiona/google-cloud(|/.*)$': '<rootDir>/libs/google-cloud/src/$1',
    '^@fiona/calls(|/.*)$': '<rootDir>/libs/calls/src/$1',
    '^@fiona/twilio(|/.*)$': '<rootDir>/libs/twilio/src/$1',
    '^@fiona/products(|/.*)$': '<rootDir>/libs/products/src/$1',
    '^@fiona/auth-connectors(|/.*)$': '<rootDir>/libs/auth-connectors/src/$1',
    '^@fiona/user-auth(|/.*)$': '<rootDir>/libs/user-auth/src/$1',
    '^@fiona/auth(|/.*)$': '<rootDir>/libs/auth/src/$1',
  },
  // clearMocks: true, // check if they affect before each/all
  // resetMocks: true, // restoreMocks difference?
  setupFilesAfterEnv: ['./testSetupAfterEnv.ts'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  errorOnDeprecated: true,
} as Config.InitialOptions;

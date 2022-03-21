module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./setupTest.js'],
    moduleNameMapper: {
        '^@/components(.*)$': '<rootDir>/src/components$1',
        '^@/pages(.*)$': '<rootDir>/src/pages$1',
        '^@/containers(.*)$': '<rootDir>/src/containers$1',
        '^@/redux(.*)$': '<rootDir>/src/redux$1',
    }
};
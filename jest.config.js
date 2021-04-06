module.exports = {
  roots: ['<rootDir>/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '/test/.*(test|spec)\\.[jt]sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '^App/(.*)$': '<rootDir>/src/app/$1',
    '^Utils/(.*)$': '<rootDir>/src/utils/$1'
  },
  setupFiles: ["jest-canvas-mock"]
}
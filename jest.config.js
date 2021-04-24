module.exports = {
  roots: ['<rootDir>/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '/test/.*(test|spec)\\.[jt]sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '^Core/(.*)$': '<rootDir>/src/Core/$1',
    '^Utils/(.*)$': '<rootDir>/src/Utils/$1',
    '^CanvasObjects/(.*)$': '<rootDir>/src/CanvasObjects/$1',
  },
  setupFiles: ["jest-canvas-mock"]
}
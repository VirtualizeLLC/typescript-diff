import { resolve } from 'path'
import * as helpers from '../lib/helpers/getEslintConfig'
import * as configReaderHelpers from '../lib/helpers/configReader'

const testConfigFileDir = resolve(__dirname, './eslintConfigFiles')
const getEslintFilesSpy = jest.spyOn(helpers, 'getEslintFiles')
const readConfigFileSpy = jest.spyOn(configReaderHelpers, 'readConfigFile')

describe('getFiles()', () => {
  it('returns all the supported files', () => {
    const output = helpers.getEslintFiles(testConfigFileDir)

    // files are exact match, addition files are ignored.
    expect(output.length).toEqual(helpers.eslintReadPriorityOrder.length)

    const priorityOrderSet = new Set(helpers.eslintReadPriorityOrder)

    output.forEach((fileName) => {
      expect(priorityOrderSet.has(fileName)).toBeTruthy()
    })
  })

  it('throws an error if the path is invalid', () => {
    try {
      expect(helpers.getEslintFiles('./bad/path/to/dir')).toThrowError()
    } catch (e) {
      /* empty */
    }
  })
})

describe('getEslintConfigFile()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('selects files that match the priority order ', () => {
    const output = helpers.getEslintConfigFile(testConfigFileDir)
    expect(helpers.getEslintFiles).toBeCalledWith(testConfigFileDir)
    expect(output).toBe(`${testConfigFileDir}/.eslintrc.js`)
  })
  it('selects files that match the priority order for unorganized file list', () => {
    const availableFiles = [
      '.eslintrc',
      '.eslintrc.json',
      '.eslintrc.js', // #1
      '.eslintrc',
      'package.json',
    ]
    getEslintFilesSpy.mockReturnValueOnce(availableFiles)
    const output = helpers.getEslintConfigFile(testConfigFileDir)
    expect(helpers.getEslintFiles).toBeCalledWith(testConfigFileDir)
    expect(output).toBe(`${testConfigFileDir}/.eslintrc.js`)
  })
  it('provides the package.json eslintConifg', () => {
    const availableFiles = ['package.json', '.eslintrc']
    getEslintFilesSpy.mockReturnValueOnce(availableFiles)
    const output = helpers.getEslintConfigFile(testConfigFileDir)
    expect(helpers.getEslintFiles).toBeCalledWith(testConfigFileDir)
    expect(output).toBe(`${testConfigFileDir}/package.json`)
  })

  it('skips package.json if eslintConfig does not exist as a key', () => {
    const availableFiles = ['package.json', '.eslintrc']
    getEslintFilesSpy.mockReturnValueOnce(availableFiles)
    readConfigFileSpy.mockReturnValue(undefined)

    const output = helpers.getEslintConfigFile(testConfigFileDir)

    expect(readConfigFileSpy).toBeCalledWith(
      `${testConfigFileDir}/package.json`,
    )

    expect(helpers.getEslintFiles).toBeCalledWith(testConfigFileDir)
    expect(output).toBe(`${testConfigFileDir}/.eslintrc`)
  })

  it('throws an error if no eslint configs can be selected', () => {
    const availableFiles = []
    getEslintFilesSpy.mockReturnValueOnce(availableFiles)
    try {
      expect(helpers.getEslintConfigFile(testConfigFileDir)).toThrowError()
    } catch (e) {
      /* empty */
    }
  })
})

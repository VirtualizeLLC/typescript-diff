import { resolve } from 'path'
import baseEslintRcFile from '@vllc/typescript-utils/.eslintrc'
import mockPackageJson from './eslintConfigFiles/package.json'
import { readConfigFile } from '../lib/helpers/configReader'

const testConfigFileDir = resolve(__dirname, './eslintConfigFiles')

describe('@vllc/eslint-tsc-diff', () => {
  describe('readConfigFile()', () => {
    it('reads .eslintrc.(yaml|yml) files', () => {
      expect(
        readConfigFile(resolve(testConfigFileDir, '.eslintrc.yaml')),
      ).toEqual(baseEslintRcFile)
      expect(
        readConfigFile(resolve(testConfigFileDir, '.eslintrc.yml')),
      ).toEqual(baseEslintRcFile)
    })
    it('reads .eslintrc.(json) and deprecated .eslintrc files', () => {
      expect(
        readConfigFile(resolve(testConfigFileDir, '.eslintrc.json')),
      ).toEqual(baseEslintRcFile)
      expect(readConfigFile(resolve(testConfigFileDir, '.eslintrc'))).toEqual(
        baseEslintRcFile,
      )
    })

    it('reads package.json eslintConfig values if they exist', () => {
      expect(
        readConfigFile(resolve(testConfigFileDir, 'package.json')),
      ).toEqual(mockPackageJson.eslintConfig)
    })

    it('reads deprecated .eslintrc as a json file', () => {
      expect(readConfigFile(resolve(testConfigFileDir, '.eslintrc'))).toEqual(
        baseEslintRcFile,
      )
    })
  })
})

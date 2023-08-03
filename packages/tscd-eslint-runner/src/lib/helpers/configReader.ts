import { load as ymlLoad } from 'js-yaml'
import { readFileSync } from 'fs'
import { ESLint } from 'eslint'

import { TSCDiffEslintConfig } from '../types'

const jsConfigPattern = '.eslintrc.(cjs|js)$'

/**
 * @describe a synchronous read of the eslint file.
 * @TODO add yaml/yml parsing (for eslint)
 * @param eslintFilePath
 */
export const readConfigFile = (filePath: string): ESLint.ConfigData => {
  if (!filePath) {
    throw new Error('Error: File path not provided')
  }
  const file = filePath.match(jsConfigPattern)
    ? require(filePath)
    : readFileSync(filePath, { encoding: 'utf-8' })

  if (!file && !filePath.match(jsConfigPattern)) {
    throw new Error(
      `@vllc/tscd-eslint-runner error, provided file path invalid, ${filePath}`,
    )
  }

  let parsedFile:
    | (ESLint.ConfigData & { eslintConfig?: ESLint.ConfigData })
    | Record<string, any>
    | null = null

  if (filePath.match(jsConfigPattern)) {
    parsedFile = file
  } else {
    try {
      if (filePath.match('^.(yml|yaml)$')) {
        parsedFile = ymlLoad(file, { json: true })
      }

      if (
        filePath.match('^.eslintrc$') ||
        filePath.match('^(package|.eslintrc).json$')
      ) {
        parsedFile = JSON.parse(file)
      }

      if (filePath.match('package.json$') && parsedFile?.eslintConfig) {
        parsedFile = parsedFile.eslintConfig
      }
    } catch (e) {
      console.error(e)
      parsedFile = null
    }
  }

  return parsedFile
}

export const generateTempEslintConfigFile = (config: TSCDiffEslintConfig) => {
  const eslintFile = readConfigFile(config.eslintConfigPath)

  if (!eslintFile) {
    throw new Error('No eslint file detected')
    return
  }

  const tsconfigFile = readConfigFile(config.tsconfigPath)

  const parserOptions: ESLint.ConfigData['parserOptions'] = {
    ...eslintFile.parserOptions,
    sourceType: 'module',
    project: {
      ...tsconfigFile,
      include: config.files,
    },
  }

  /**
   * applying parserOptions to overrides gets complicated due to needing to find the @typescript-eslint/parser
   */
  const overrides = [
    ...eslintFile.overrides,
    { files: ['*.ts', '*.tsx'], parserOptions },
  ]

  const eslintConfig: ESLint.ConfigData = {
    ...eslintFile,
    parserOptions,
    overrides,
  }

  if (eslintConfig.overrides) {
    config.verbose
  }

  return eslintConfig
}

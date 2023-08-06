import { readFileSync } from 'fs'
import { load as ymlLoad } from 'js-yaml'
import { ESLint } from 'eslint'

const jsConfigPattern = '.eslintrc.(cjs|js)$'
const ymlConfigPattern = '.eslintrc.(yml|yaml)$'
const packageJsonPattern = 'package.json$'
/**
 * @describe a synchronous read of the eslint file.
 * @TODO add yaml/yml parsing (for eslint)
 * @param eslintFilePath
 */
export const readConfigFile = (filePath: string): ESLint.ConfigData => {
  if (!filePath) {
    throw new Error('Error: File path not provided')
  }
  const file =
    filePath.match(jsConfigPattern) || filePath.match(packageJsonPattern)
      ? require(filePath)
      : readFileSync(filePath, { encoding: 'utf-8' })

  if (!file) {
    throw new Error(
      `@vllc/eslint-tsc-diff error, provided file path invalid, ${filePath}`,
    )
  }

  let parsedFile:
    | (ESLint.ConfigData & { eslintConfig?: ESLint.ConfigData })
    | null = null

  if (filePath.match(jsConfigPattern) || filePath.match('package.json$')) {
    parsedFile = file
  } else {
    try {
      if (filePath.match(ymlConfigPattern)) {
        parsedFile = ymlLoad(file, { json: true })
      } else if (
        filePath.match('.eslintrc$') ||
        filePath.match('(package|.eslintrc).json$')
      ) {
        parsedFile = JSON.parse(file)
      }
    } catch (e) {
      console.error(e)
      parsedFile = null
    }
  }

  if (filePath.match(packageJsonPattern) && parsedFile?.eslintConfig) {
    parsedFile = parsedFile.eslintConfig
  }

  return parsedFile
}

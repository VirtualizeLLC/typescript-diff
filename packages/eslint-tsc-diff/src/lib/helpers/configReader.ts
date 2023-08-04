import { load as ymlLoad } from 'js-yaml'
import { readFileSync } from 'fs'
import { ESLint } from 'eslint'

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
      `@vllc/eslint-tsc-diff error, provided file path invalid, ${filePath}`,
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

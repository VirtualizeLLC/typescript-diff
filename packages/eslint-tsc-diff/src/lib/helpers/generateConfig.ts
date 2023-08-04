import { isValidPath, parseFilesToInclude } from './fileValidation'
import { writeFileSync } from 'fs'
import { TSCDiffEslintConfig } from '../types'
import { resolve } from 'path'
import { readConfigFile } from './configReader'
import { ESLint } from 'eslint'
import { writeFileOptions } from '../constants/shellConfig'
import { ErrorMessage, WarningMessage } from '../constants/messages'

const getTsconfigEslintFilePath = (config: TSCDiffEslintConfig) =>
  resolve(config.tmpFileDir, config.tsconfigTmpFileName)

/**
 * @description Generates a temp eslint config and optionally a temp tsconfig to be run in a shell process. The configs only include the files that match a pattern.
 * @param config
 * @returns path string of eslint file
 */
export const generateTempEslintConfigFile = (
  config: TSCDiffEslintConfig,
): string => {
  const eslintFile = readConfigFile(config.eslintConfigPath)

  /**
   * @note this is a non-recoverable state, if this lib cannot find a eslint file the lib will not be able to run eslint later.
   */
  if (!eslintFile) {
    throw new Error(ErrorMessage.NO_ESLINT_FILE_FOUND)
  }

  const tsconfigFile = readConfigFile(config.tsconfigPath)
  const filesToInclude = parseFilesToInclude(config)

  /**
   * early exit if files do not need to be generated. Use the found eslint file
   */
  if (filesToInclude.length === 0) {
    config.verbose &&
      console.log(
        WarningMessage.NO_FILES_TO_INCLUDE,
        `skipping config generation and running with eslint file ${eslintFile}`,
      )
    return config.eslintConfigPath
  }

  const newTsConfig = {
    ...tsconfigFile,
    include: filesToInclude,
  }

  const tscOutputPath = getTsconfigEslintFilePath(config)

  /**
   * dry-run skips writeFile
   */
  if (!config.projectAsJson && !config.dryRun) {
    writeFileSync(tscOutputPath, JSON.stringify(newTsConfig), writeFileOptions)
    isValidPath(tscOutputPath)
  }

  const parserOptions: ESLint.ConfigData['parserOptions'] = {
    ...eslintFile.parserOptions,
    sourceType: 'module',
    /**
     * @warning The fallback json method may eventually fail due to typescript mentioning project should only be a tsconfig path or array of paths. https://typescript-eslint.io/packages/parser#project
     * The string path should work for all versions of @typescript-eslint/parser
     */
    project: !config.projectAsJson ? tscOutputPath : newTsConfig,
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

  if (config.noInlineConfig !== undefined) {
    eslintConfig.noInlineConfig = config.noInlineConfig
  }

  if (eslintConfig.overrides) {
    config.verbose
  }

  if (config.verbose || config.dryRun) {
    console.log(
      'New eslintConfig (stringified):',
      JSON.stringify(eslintConfig),
      '\n\nnew parserConfig (json)\n',
      JSON.stringify(eslintConfig.parserOptions),
    )
  }

  if (config.dryRun) {
    return
  }

  const filePath = resolve(
    __dirname,
    config.tmpFileDir,
    config.eslintTmpFileName,
  )

  writeFileSync(filePath, JSON.stringify(eslintConfig), writeFileOptions)

  return filePath
}

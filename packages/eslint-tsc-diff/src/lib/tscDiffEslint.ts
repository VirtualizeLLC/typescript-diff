import { execSync } from 'child_process'

import { ESLint } from 'eslint'
import { EslintTscDiffConfig } from './types/EslintTscDiffConfig'
import { generateTempEslintConfigFile } from './helpers/generateConfig'
import { execSyncOptions } from './constants/shellConfig'
import { globalConfigInstance } from './constants/globalConfig'
import { parseEslintFilesToInclude } from './helpers/fileValidation'
import { validateEslintScriptRunner } from './helpers/validateEslintRunner'

export const argsToRemove = ['--config', '--fix']
export const argsToRemoveString = argsToRemove.join(' ')
const argsToRemoveRegexp = argsToRemove.join('|').replace('--', '')

export const parseEslintArgs = (args: string) => {
  return args.replace(`--(${argsToRemoveRegexp})`, '')
}

export const runEslintFromShell = (
  eslintConfigFilePath: string,
  config: EslintTscDiffConfig,
) => {
  validateEslintScriptRunner(config.eslintScriptRunner)
  const filesToInclude = parseEslintFilesToInclude(config)
  const files = filesToInclude.join(' ')
  if (!filesToInclude || files.length === 0) {
    console.error(
      'no files to include',
      `original files length: ${config.files.length}, with ignoreFilter ${filesToInclude.length}`,
    )
    return
  }
  const scriptArgs = ['eslint', files]

  if (config.eslintScriptRunner) {
    scriptArgs.unshift(config.eslintScriptRunner)
  } else {
    config.verbose &&
      console.log(
        'No eslint runner detected, will default to running eslint globally which may throw an error',
      )
  }

  const [major, minor] = ESLint.version.split('.')
  if ((parseInt(major) >= 6 && parseInt(minor) >= 8) || parseInt(major) > 6) {
    // prevents having to filter all these changed files and search through eslint config to find files that are handled >=6.x.x
    scriptArgs.push('--no-error-on-unmatched-pattern')
  }

  if (config.eslintFix) {
    scriptArgs.push('--fix')
  }

  scriptArgs.push('--config', eslintConfigFilePath)

  if (config.noEslintRc) {
    scriptArgs.push('--no-eslintrc')
  }

  if (config.eslintArgs) {
    scriptArgs.push(parseEslintArgs(config.eslintArgs))
  }

  const script = scriptArgs.join(' ')

  if (config.verbose) {
    console.log(`\nRunning eslint script: ${script}`)
  }

  execSync(script, {
    ...execSyncOptions,
    stdio: 'inherit',
  })
}

export function tscDiffEslint(config: typeof globalConfigInstance) {
  const eslintConfigFilePath = generateTempEslintConfigFile(config)

  if (config.dryRun) {
    return
  }

  runEslintFromShell(eslintConfigFilePath, config)
}

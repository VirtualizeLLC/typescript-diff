import { execSync } from 'child_process'

import { EslintTscDiffConfig } from './types/EslintTscDiffConfig'
import { generateTempEslintConfigFile } from './helpers/generateConfig'
import { execSyncOptions } from './constants/shellConfig'
import { globalConfigInstance } from './constants/globalConfig'
import { parseEslintFilesToInclude } from './helpers/fileValidation'

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
  const filesToInclude = parseEslintFilesToInclude(config)
  if (!filesToInclude) {
    console.error(
      'no files to include',
      `original files length: ${config.files.length}, with ignoreFilter ${filesToInclude.length}`,
    )
    return
  }
  const scriptArgs = [
    'eslint',
    filesToInclude.join(' '),
    '--no-error-on-unmatched-pattern', // prevents having to filter all these changed files and search through eslint config to find files that are handled
  ]

  if (config.eslintFix) {
    scriptArgs.push('--fix')
  }

  scriptArgs.push('--config', eslintConfigFilePath)

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

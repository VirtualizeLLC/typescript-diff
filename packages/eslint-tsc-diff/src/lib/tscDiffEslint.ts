import { execSync } from 'child_process'
import { tscDiff } from '@vllc/tsc-diff'

import { TSCDiffEslintConfig } from './types'
import { generateTempEslintConfigFile } from './helpers/generateConfig'
import { execSyncOptions } from './constants/shellConfig'

export const argsToRemove = ['--config', '--fix']
export const argsToRemoveString = argsToRemove.join(' ')
const argsToRemoveRegexp = argsToRemove.join('|').replace('--', '')

export const parseEslintArgs = (args: string) => {
  return args.replace(`--(${argsToRemoveRegexp})`, '')
}

export const runEslintFromShell = (
  eslintConfigFilePath: string,
  config: TSCDiffEslintConfig,
) => {
  const scriptArgs = ['eslint', '--config', eslintConfigFilePath]

  if (config.eslintFix) {
    scriptArgs.push('--fix')
  }

  if (config.eslintArgs) {
    scriptArgs.push(parseEslintArgs(config.eslintArgs))
  }

  const script = scriptArgs.join(' ')

  if (config.verbose) {
    console.log(`Running eslint script: ${script}`)
  }

  execSync(script, {
    ...execSyncOptions,
    stdio: config.eslintStdio,
  })
}

export function tscDiffEslint(config: TSCDiffEslintConfig) {
  const files = tscDiff(config)
  const eslintConfigFilePath = generateTempEslintConfigFile({
    ...config,
    files,
  })

  if (config.dryRun) {
    return
  }

  runEslintFromShell(eslintConfigFilePath, config)
}

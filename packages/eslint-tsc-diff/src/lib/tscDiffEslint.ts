import { execSync } from 'child_process'
import { tscDiff } from '@vllc/tsc-diff'

import { TSCDiffEslintConfig } from './types'
import { generateTempEslintConfigFile } from './helpers/generateConfig'
import { execSyncOptions } from './constants/shellConfig'

export const runEslintFromShell = (
  eslintConfigFilePath: string,
  config: TSCDiffEslintConfig,
) => {
  config.verbose && console.log('running eslint')
  execSync(`eslint --fix --config ${eslintConfigFilePath}`, {
    ...execSyncOptions,
    stdio: 'inherit',
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

import { tscDiff } from '@vllc/tsc-diff'
import { execSync } from 'child_process'

import { shellConfig } from './constants/shellConfig'
import { TSCDiffEslintConfig } from './types'
import { generateTempEslintConfigFile } from './helpers/configReader'
import { resolve } from 'path'

export const runEslintFromShell = (config: TSCDiffEslintConfig) => {
  const eslintTmpConfigFile = resolve(config.tmpFileDir, config.tmpFileName)
  console.log('running eslint')
  execSync(`eslint --fix --config ${eslintTmpConfigFile}`, {
    ...shellConfig,
    stdio: 'inherit',
  })
}

export function tscDiffEslint(config: TSCDiffEslintConfig) {
  const files = tscDiff(config)
  const outputFile = generateTempEslintConfigFile({ ...config, files })

  if (config.verbose) {
    console.log(
      'New eslintConfig (stringified):',
      JSON.stringify(outputFile),
      '\n\nnew parserConfig (json)\n',
      JSON.stringify(outputFile.parserOptions),
    )
  }
}

import { tscDiff } from '@vllc/tsc-diff'
import { execSync } from 'child_process'

import { shellConfig } from './constants/shellConfig'
import { TSCDiffEslintConfig } from './types'
import { generateTempEslintConfigFile } from './helpers/configReader'

const runEslintFromShell = (config: TSCDiffEslintConfig) => {
  execSync('eslint --fix --config ', shellConfig)
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

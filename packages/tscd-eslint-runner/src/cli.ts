import { resolve } from 'path'
import { Command } from 'commander'
import { cliSharedOptions } from '@vllc/tsc-diff'

import packageJson from '../package.json'
import { tscDiffEslint } from './lib/tscDiffEslint'

import { getEslintConfigFile } from './lib/helpers/getEslintConfig'
import { TSCDiffEslintConfig } from './lib/types'

const program = new Command()

cliSharedOptions(program)
  .name(packageJson.name)
  .option(
    '--verbose',
    'adds additional logging for outputs. Enabled by default for non-prod releases',
    /**
     * @todo make this boolean based off environment variable when compiling the app
     */
    true,
  )
  .option(
    '--tsconfigPath <path>',
    'add a typescript config path, must be relative from current process directory',
    resolve(process.cwd(), 'tsconfig.json'),
  )
  .option(
    '--cwd <path>',
    'set the root directory. Useful if the directory is relative',
    process.cwd(),
  )
  .option(
    '--eslintConfigPath <path>',
    'set the root directory. Useful if the directory is relative',
    getEslintConfigFile(),
  )
  .action((config: TSCDiffEslintConfig) => {
    console.log('input config:', config)
    const output = tscDiffEslint(config)

    if (config.verbose) {
      console.log('output files:', output)
    }
  })
program.parse(process.argv)

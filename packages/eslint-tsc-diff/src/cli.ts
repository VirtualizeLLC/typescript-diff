import { resolve } from 'path'
import { Command } from 'commander'
import { cliSharedOptions } from '@vllc/tsc-diff'

import packageJson from '../package.json'
import { runEslintFromShell, tscDiffEslint } from './lib/tscDiffEslint'

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
    false,
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
  .option('--dry-run <boolean>', 'outputs the change in config only', false)
  .option(
    '--tmpFileDir <string>',
    'The directory the eslint file outputs to',
    process.cwd(),
  )
  .option(
    '--tmpFileName <string>',
    'The temp eslint file name, make sure this file is ignored in .gitignore, it must be a .json file',
    '.eslintrc-diff.json',
  )
  .option(
    '--retainTmpFile <boolean>',
    'allows for retaining the temp eslint file for debugging purposes',
  )
  .option(
    '--noInlineConfig <boolean>',
    'eslint flag that prevents eslint from attempting to merge eslint config unrelated to the config file passed in. Enabling this could cause issues with extending rules based on path',
    false,
  )
  .action((config: TSCDiffEslintConfig) => {
    console.log('input config:', config)
    const output = tscDiffEslint(config)
    if (config.verbose) {
      console.log('output files:', output)
    }

    if (config.dryRun) {
      return output
    }

    runEslintFromShell(config)
  })
program.parse(process.argv)

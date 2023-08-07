import { resolve } from 'path'
import { readFileSync } from 'fs'
import { Command } from 'commander'
import { cliSharedOptions } from '@vllc/tsc-diff'

import { argsToRemoveString, tscDiffEslint } from './lib/tscDiffEslint'

import { EslintTscDiffConfig } from './lib/types/EslintTscDiffConfig'
import { globalConfigInstance } from './lib/constants/globalConfig'
import { CLIConfig } from './lib/types/CliConfig'

const program = new Command()

const getPackageJson = async (): Promise<{ name: string; version: string }> => {
  const packageJson = readFileSync(
    resolve(__dirname, '../package.json'),
    'utf-8',
  )
  return JSON.parse(packageJson)
}

const runCli = async () => {
  globalConfigInstance.initializeConfig()
  const packageJson = await getPackageJson()

  cliSharedOptions(program, globalConfigInstance)
    .name(packageJson.name)
    .version(
      packageJson.version,
      '-v, --version',
      'output the current version of the cli',
    )
    .option(
      '--tsconfig-path <path>',
      'add a typescript config path, must be relative from current process directory',
      globalConfigInstance.tsconfigPath,
    )
    .option(
      '--eslint-config-path <path>',
      'set the root directory. Useful if the directory is relative',
      globalConfigInstance.eslintConfigPath,
    )
    .option(
      '--dry-run <boolean>',
      'outputs the change in config only',
      globalConfigInstance.dryRun,
    )
    .option(
      '--tmp-file-dir <string>',
      'The directory the eslint file outputs to',
      globalConfigInstance.tmpFileDir,
    )
    .option(
      '-eson, --eslint-tmp-file-name <string>',
      'The temp eslint file name, make sure this file is ignored in .gitignore, it must be a .json file',
      globalConfigInstance.eslintTmpFileName,
    )
    .option(
      '--retain-tmp-files <boolean>',
      'allows for retaining the temp eslint file for debugging purposes',
    )
    .option(
      '--no-inline-config <boolean>',
      'eslint flag that prevents eslint from attempting to merge eslint config unrelated to the config file passed in. Enabling this could cause issues with extending rules based on path',
    )
    .option(
      '--project-as-json <boolean>',
      'allows for setting the output project file directly, this way of setting project may be deprecated or and/or broken on higher versions of @typescript/eslint-parser',
    )
    .option(
      '-tson, --tsconfig-tmp-file-name <boolean>',
      'set the output filename for the eslintconfig that will be consumed by the @typescript/eslint-parser project the file will output to --tmpFileDir and will be deleted on cleanup',
      'tsconfig.eslint-diff.json',
    )
    .option(
      '--allow-json-files <boolean>',
      'allow json files to be included in the generated tsconfig include array',
      globalConfigInstance.allowJsonFiles,
    )
    .option(
      '-eargs, --eslint-args <string>',
      `These args will be passed to the eslint cli directly. Warning: args will be ignored: ${argsToRemoveString}`,
    )
    .option(
      '--eslint-fix',
      'eslint fix arg is passed into the eslint command',
      globalConfigInstance.eslintFix,
    )
    .option(
      '--eslint-stdio <string>',
      'manually set the stdio for the eslint script. Typically it will be set to inherit',
      globalConfigInstance.eslintStdio as string,
    )
    .option(
      '--eslint-ignore-files [filePatterns...]',
      'A list of files or regexp patterns to ignore, these files will not be parsed by eslint',
      globalConfigInstance.eslintIgnoreFiles,
    )
    .option(
      '--eslint-include-files [filePatterns...]',
      'A list of files or regexp patterns to include (this will be combined with ignore files, ignore files win), these files will be parsed by eslint',
      globalConfigInstance.eslintIncludeFiles,
    )
    .option(
      '--no-eslint-rc <boolean>',
      'eslint flag for skipping nested eslint parsing',
      globalConfigInstance.noEslintRc,
    )
    .option(
      '--tsconfig-include-files [filePatterns...]',
      'A list of files or regexp patterns to include, this will override the default .ts|tsx matcher',
      globalConfigInstance.tsconfigIncludeFiles,
    )
    .option(
      '--print-config',
      'prints the config file, will auto exit if this option is provided',
    )
    .option(
      '--print-config-defaults',
      'prints the config file defaults, these defaults are overridden by local config and options provided in the cli, will auto exit if this option is provided',
    )
    .action((config: Partial<EslintTscDiffConfig> & Partial<CLIConfig>) => {
      if (config.printConfig) {
        return
      }
      globalConfigInstance.update(config)
      tscDiffEslint(globalConfigInstance)
    })
  program.parse(process.argv)
}

runCli()

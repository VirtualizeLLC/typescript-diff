import { Command } from 'commander'
import { cliSharedOptions } from '@vllc/tsc-diff'

import packageJson from '../package.json'
import { argsToRemoveString, tscDiffEslint } from './lib/tscDiffEslint'

import { EslintTscDiffConfig } from './lib/types/EslintTscDiffConfig'
import { globalConfigInstance } from './lib/constants/globalConfig'

const program = new Command(packageJson.name)

cliSharedOptions(program)
  .name(packageJson.name)
  .option(
    '--tsconfigPath <path>',
    'add a typescript config path, must be relative from current process directory',
    globalConfigInstance.tsconfigPath,
  )
  .option(
    '--eslintConfigPath <path>',
    'set the root directory. Useful if the directory is relative',
    globalConfigInstance.eslintConfigPath,
  )
  .option(
    '--dryRun <boolean>',
    'outputs the change in config only',
    globalConfigInstance.dryRun,
  )
  .option(
    '--tmpFileDir <string>',
    'The directory the eslint file outputs to',
    globalConfigInstance.tmpFileDir,
  )
  .option(
    '-eson, --eslintTmpFileName <string>',
    'The temp eslint file name, make sure this file is ignored in .gitignore, it must be a .json file',
    globalConfigInstance.eslintTmpFileName,
  )
  .option(
    '--retainTmpFiles <boolean>',
    'allows for retaining the temp eslint file for debugging purposes',
  )
  .option(
    '--noInlineConfig <boolean>',
    'eslint flag that prevents eslint from attempting to merge eslint config unrelated to the config file passed in. Enabling this could cause issues with extending rules based on path',
  )
  .option(
    '--projectAsJson <boolean>',
    'allows for setting the output project file directly, this way of setting project may be deprecated or and/or broken on higher versions of @typescript/eslint-parser',
  )
  .option(
    '-tson, --tsconfigTmpFileName <boolean>',
    'set the output filename for the eslintconfig that will be consumed by the @typescript/eslint-parser project the file will output to --tmpFileDir and will be deleted on cleanup',
    'tsconfig.eslint-diff.json',
  )
  .option(
    '--allowJsonFiles <boolean>',
    'allow json files to be included in the generated tsconfig include array',
    globalConfigInstance.allowJsonFiles,
  )
  .option(
    '-eargs, --eslintArgs <string>',
    `These args will be passed to the eslint cli directly. Warning: args will be ignored: ${argsToRemoveString}`,
  )
  .option(
    '--eslintFix',
    'eslint fix arg is passed into the eslint command',
    globalConfigInstance.eslintFix,
  )
  .option(
    '--eslintStdio <string>',
    'manually set the stdio for the eslint script. Typically it will be set to inherit',
    globalConfigInstance.eslintStdio as string,
  )
  .option(
    '--eslintIgnoreFiles [filePatterns...]',
    'A list of files or regexp patterns to ignore, these files will not be parsed by eslint',
    globalConfigInstance.eslintIgnoreFiles,
  )
  .option(
    '--eslintIncludeFiles [filePatterns...]',
    'A list of files or regexp patterns to include (this will be combined with ignore files, ignore files win), these files will be parsed by eslint',
    globalConfigInstance.eslintIncludeFiles,
  )
  .option(
    '--tsconfigIncludeFile [filePatterns...]',
    'A list of files or regexp patterns to include, this will override the default .ts|tsx matcher',
    globalConfigInstance.tsconfigIncludeFiles,
  )
  .action((config: Partial<EslintTscDiffConfig>) => {
    globalConfigInstance.update(config)
    tscDiffEslint(globalConfigInstance)
  })
program.parse(process.argv)

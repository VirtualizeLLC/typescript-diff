import { StdioOptions } from 'child_process'
import { TscDiffConfig } from '@vllc/tsc-diff'

export enum EslintScriptRunnerOptions {
  NPX = 'npx',
  PNPX = 'pnpx',
  YARN = 'yarn',
  ESLINT = 'eslint',
}

export interface EslintTscDiffConfig extends TscDiffConfig {
  allowJsonFiles: boolean
  dryRun?: boolean
  configFileDir: string
  configFileName: string
  eslintConfigPath: string // required path to eslint config
  eslintTmpFileName: string
  eslintArgs?: string
  eslintFix?: boolean
  eslintStdio?: StdioOptions
  noInlineConfig?: boolean
  projectAsJson?: boolean
  retainTmpFiles?: boolean
  tmpFileDir: string
  tsconfigTmpFileName: string
  tsconfigPath: string // required path to eslint config
  eslintIgnoreFiles: string[]
  eslintIncludeFiles: string[]
  /**
   * @warning this must be strongly typed in order to prevent malicious usage if the config file or flags are changed to run other scripts.
   */
  eslintScriptRunner?: EslintScriptRunnerOptions
  tsconfigIncludeFiles: string[]
  noEslintRc: boolean
}

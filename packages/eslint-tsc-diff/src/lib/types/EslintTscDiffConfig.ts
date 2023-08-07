import { StdioOptions } from 'child_process'
import { TscDiffConfig } from '@vllc/tsc-diff'

export enum EslintScriptRunnerOptions {
  NPX = 'npx',
  PNPX = 'pnpx',
  YARN = 'yarn',
}

export interface EslintTscDiffConfig extends TscDiffConfig {
  allowJsonFiles: boolean
  configFileDir: string
  configFileName: string
  dryRun?: boolean
  eslintArgs?: string
  eslintConfigPath: string // required path to eslint config
  eslintFix?: boolean
  eslintIgnoreFiles: string[]
  eslintIncludeFiles: string[]
  /**
   * @eslintScriptRunner must be strongly typed in order to prevent malicious usage if the config file or flags are changed to run other scripts.
   */
  eslintScriptRunner?: EslintScriptRunnerOptions
  eslintStdio?: StdioOptions
  eslintTmpFileName: string
  noEslintRc: boolean
  noInlineConfig?: boolean
  projectAsJson?: boolean
  retainTmpFiles?: boolean
  tmpFileDir: string
  tsconfigIncludeFiles: string[]
  tsconfigPath: string // required path to eslint config
  tsconfigTmpFileName: string
}

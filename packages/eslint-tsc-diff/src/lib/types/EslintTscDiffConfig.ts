import { StdioOptions } from 'child_process'
import { TscDiffConfig } from '@vllc/tsc-diff'

export interface EslintTscDiffConfig extends TscDiffConfig {
  allowJsonFiles: boolean
  dryRun?: boolean
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
  tsconfigIncludeFiles: string[]
  noEslintRc: boolean
}

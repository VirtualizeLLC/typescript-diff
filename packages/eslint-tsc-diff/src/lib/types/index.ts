import { TscDiffConfig } from '@vllc/tsc-diff'
import { StdioOptions } from 'child_process'

export interface TSCDiffEslintConfig extends TscDiffConfig {
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
}

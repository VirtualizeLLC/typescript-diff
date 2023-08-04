import { TscDiffConfig } from '@vllc/tsc-diff'

export interface TSCDiffEslintConfig extends TscDiffConfig {
  dryRun?: boolean
  eslintConfigPath: string // required path to eslint config
  tsconfigPath: string // required path to eslint config
  retainTmpFile?: boolean
  tmpFileName: string
  tmpFileDir: string
  noInlineConfig: boolean
  projectAsJson: boolean
  tsconfigFileName: string
  allowJson: boolean
}

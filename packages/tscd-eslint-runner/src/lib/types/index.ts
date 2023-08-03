import { TscDiffConfig } from '@vllc/tsc-diff'

export interface TSCDiffEslintConfig extends TscDiffConfig {
  eslintConfigPath: string // required path to eslint config
  tsconfigPath: string // required path to eslint config
}

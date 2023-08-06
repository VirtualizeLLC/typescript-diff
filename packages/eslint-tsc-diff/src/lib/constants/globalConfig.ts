import { StdioOptions } from 'child_process'
import { resolve } from 'path'
import { tscDiff } from '@vllc/tsc-diff'
import { EslintTscDiffConfig } from '../types/EslintTscDiffConfig'
import { getEslintConfigFile } from '../helpers/getEslintConfig'

export class GlobalConfig implements EslintTscDiffConfig {
  eslintConfigPath = ''
  eslintTmpFileName: string = '.eslintrc-diff.json'
  tsconfigPath = resolve(process.cwd(), 'tsconfig.json')
  tmpFileDir: string = process.cwd()
  tsconfigTmpFileName: string = ''
  allowJsonFiles: boolean = true
  noInlineConfig: boolean = false
  eslintStdio: StdioOptions = 'inherit'
  eslintFix: boolean = true
  dryRun: boolean = false
  verbose: boolean = true
  files?: string[] = undefined
  eslintIgnoreFiles: string[] = [
    '(^.eslintrc.(js|json|yaml|yml)|.eslintrc)',
    '.(yaml|yml|json)$',
  ]
  eslintIncludeFiles: string[] = ['.(cjs|mjs|js|jsx|ts|tsx)']
  noEslintRc: boolean = false
  tsconfigIncludeFiles: string[] = []

  update(config: Partial<EslintTscDiffConfig>) {
    Object.entries(config).map(([key, val]) => {
      this[key] = val
    })

    if (!this.eslintConfigPath) {
      this.eslintConfigPath = getEslintConfigFile()
    }

    if (!config.files && !this.files) {
      this.files = tscDiff(this)
    }
  }
}

export const globalConfigInstance = new GlobalConfig()

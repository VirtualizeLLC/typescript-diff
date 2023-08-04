import { StdioOptions } from 'child_process'
import { TSCDiffEslintConfig } from '../types'
import { resolve } from 'path'
import { getEslintConfigFile } from '../helpers/getEslintConfig'

class GlobalConfig implements TSCDiffEslintConfig {
  eslintConfigPath = process.cwd()
  eslintTmpFileName: string = '.eslintrc-diff.json'
  tsconfigPath = resolve(process.cwd(), 'tsconfig.json')
  tmpFileDir: string = process.cwd()
  tsconfigTmpFileName: string = ''
  allowJsonFiles: boolean = true
  eslintStdio: StdioOptions = 'inherit'
  eslintFix: boolean = true
  dryRun: boolean = false
  verbose: boolean = true

  update(config: Partial<TSCDiffEslintConfig>) {
    Object.entries(config).map(([key, val]) => {
      this[key] = val
    })

    if (!this.eslintConfigPath) {
      getEslintConfigFile()
    }
  }
}

export const globalConfigInstance = new GlobalConfig()

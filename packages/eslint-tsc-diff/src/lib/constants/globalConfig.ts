import { StdioOptions } from 'child_process'
import { resolve } from 'path'
import { readFileSync, readdirSync } from 'fs'
import { tscDiff } from '@vllc/tsc-diff'
import {
  EslintScriptRunnerOptions,
  EslintTscDiffConfig,
} from '../types/EslintTscDiffConfig'
import { getEslintConfigFile } from '../helpers/getEslintConfig'

export const globalConfigDefaults: EslintTscDiffConfig = {
  allowJsonFiles: true,
  configFileDir: process.cwd(),
  configFileName: '.eslint-tsc-diff.json',
  dryRun: false,
  eslintConfigPath: '',
  eslintFix: true,
  eslintIgnoreFiles: [
    '(^.eslintrc.(js|json|yaml|yml)|.eslintrc)',
    '.(yaml|yml|json)$',
  ],
  eslintIncludeFiles: ['.(cjs|mjs|js|jsx|ts|tsx)$'],
  eslintStdio: 'inherit',
  eslintTmpFileName: '.eslintrc-diff.json',
  eslintScriptRunner: EslintScriptRunnerOptions.NPX,
  files: undefined,
  noEslintRc: false,
  noInlineConfig: false,
  remoteName: 'origin',
  tmpFileDir: process.cwd(),
  tsconfigIncludeFiles: [],
  tsconfigPath: resolve(process.cwd(), 'tsconfig.json'),
  tsconfigTmpFileName: 'tsconfig.eslint-diff.json',
  verbose: false,
}

export class GlobalConfig implements EslintTscDiffConfig {
  allowJsonFiles: boolean
  configFileDir: string
  dryRun: boolean
  eslintConfigPath: string
  eslintFix: boolean
  eslintIgnoreFiles: string[]
  eslintIncludeFiles: string[]
  eslintStdio: StdioOptions
  eslintTmpFileName: string
  eslintScriptRunner?: EslintScriptRunnerOptions
  files?: string[]
  noEslintRc: boolean
  noInlineConfig: boolean
  readonly configFileName: string
  tmpFileDir: string
  tsconfigIncludeFiles: string[]
  tsconfigPath: string
  tsconfigTmpFileName: string
  verbose: boolean

  constructor(config: EslintTscDiffConfig) {
    this.update(config)
  }

  /**
   * if this is called before
   */
  parseConfig = (): Partial<EslintTscDiffConfig> | null => {
    try {
      const files = readdirSync(this.configFileDir, 'utf-8')
      const hasConfigFile = new Set(files).has(this.configFileName)
      if (!hasConfigFile) {
        this.verbose &&
          console.warn(`No config file provided. In ${this.configFileDir}`)
        return
      }

      const configFile = JSON.parse(readFileSync(this.configFileName, 'utf-8'))
      return configFile
    } catch (e) {
      console.error(e)
    }
    return null
  }

  /**
   * @todo add something like zod to validate the schema aligns with the EslintTscDiffConfig interface
   */
  initializeConfig = () => {
    const configFile = this.parseConfig()

    if (!configFile) {
      return
    }

    Object.entries(configFile).map(([key, val]) => {
      this[key] = val
    })
  }

  /**
   * updates will override any config file settings if the data has been changed
   */
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

export const globalConfigInstance = new GlobalConfig(globalConfigDefaults)

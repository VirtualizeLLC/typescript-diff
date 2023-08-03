import { TSCDiffEslintConfig } from '../types'

class GlobalConfig implements TSCDiffEslintConfig {
  eslintConfigPath = process.cwd()
  tsconfigPath = process.cwd()

  setGlobalConfig(config: TSCDiffEslintConfig) {
    Object.entries(config).map(([key, val]) => {
      this[key] = val
    })
  }
}

export const globalConfigInstance = new GlobalConfig()

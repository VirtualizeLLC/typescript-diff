import { accessSync } from 'fs'
import { TSCDiffEslintConfig } from '../types'

export const isValidPath = (pathString: string) => {
  try {
    accessSync(pathString)
  } catch (e) {
    throw new Error(`Invalid path provided: ${e}`)
  }
}

export const parseFilesToInclude = (config: TSCDiffEslintConfig) => {
  return config.files.filter((file: string) => {
    if (config.allowJsonFiles && file.match('.json$')) {
      return true
    }
    if (file.match('.(ts|tsx)$')) {
      return true
    }
    return false
  })
}

import { accessSync } from 'fs'
import { EslintTscDiffConfig } from '../types/EslintTscDiffConfig'

export const isValidPath = (pathString: string) => {
  try {
    accessSync(pathString)
  } catch (e) {
    throw new Error(`Invalid path provided: ${e}`)
  }
}

export const ignoreFileMatcher = (
  file: string,
  ignorePatterns: string[],
): boolean => {
  let shouldIgnore = false
  ignorePatterns.forEach((pattern: string) => {
    if (file.match(pattern) || file === pattern) {
      shouldIgnore = true
      return shouldIgnore
    }
  })
  return shouldIgnore
}

export const includeFileMatcher = (
  file: string,
  includePatterns: string[],
): boolean => {
  let shouldIgnore = false
  includePatterns.forEach((pattern: string) => {
    if (file.match(pattern) || file === pattern) {
      shouldIgnore = true
      return shouldIgnore
    }
  })
  return shouldIgnore
}

export const parseEslintFilesToInclude = (config: EslintTscDiffConfig) => {
  if (!config.eslintIgnoreFiles) {
    return config.files
  }

  return config.files.filter(
    (file: string) =>
      !ignoreFileMatcher(file, config.eslintIgnoreFiles) &&
      includeFileMatcher(file, config.eslintIncludeFiles),
  )
}

export const parseFilesToInclude = (config: EslintTscDiffConfig) => {
  return config.files.filter((file: string) => {
    if (ignoreFileMatcher(file, config.eslintIgnoreFiles)) {
      return false
    }
    if (config.allowJsonFiles && file.match('.json$')) {
      return true
    }
    if (file.match('.(ts|tsx)$')) {
      return true
    }
    return false
  })
}

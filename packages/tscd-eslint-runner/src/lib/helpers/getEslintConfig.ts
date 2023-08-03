import { execSync } from 'child_process'
import { accessSync } from 'fs'
import { join } from 'path'
import { readConfigFile } from './configReader'

/**
 * PriorityOrder based on the docs: https://eslint.org/docs/latest/use/configure/configuration-files
 */
export const eslintReadPriorityOrder = [
  '.eslintrc.js',
  '.eslintrc.cjs',
  '.eslintrc.yaml',
  '.eslintrc.yml',
  '.eslintrc.json',
  'package.json',
  '.eslintrc', // implicit .json and only supported as a backup
]

const packageJSONKey = 'eslintConfig'

const isValidDirPath = (pathString: string) => {
  try {
    accessSync(pathString)
  } catch (e) {
    throw new Error(`Invalid path provided: ${e}`)
  }
}

/**
 * @description internal method exported to make testing easier
 */
export const getEslintFiles = (eslintFileDir: string = process.cwd()) => {
  isValidDirPath(eslintFileDir)

  const files = execSync('ls -a', {
    cwd: eslintFileDir,
    stdio: 'pipe',
    encoding: 'utf-8',
  })
    .split('\n')
    .filter((fileName) =>
      fileName.match(
        /^(package\.json|.eslintrc$|\.eslintrc\.(js|cjs|json|yml|yaml))$/,
      ),
    )

  return files
}

/**
 * @description This probably re-invents the wheel but it will automatically look for eslint files that match and then re-write them based on the structure
 * @TODO if eslint exports this functionality use that method instead
 * @TODO this must be tested
 */
export const getEslintConfigFile = (
  eslintFilesDir: string = process.cwd(),
): string => {
  const matches = getEslintFiles(eslintFilesDir)

  if (!matches) {
    throw new Error('No eslint files found')
  }

  let selectedFile = ''
  for (const eslintFileOrderItem of eslintReadPriorityOrder) {
    for (const fileToMatch of matches) {
      if (fileToMatch.match(new RegExp(`${eslintFileOrderItem}$`))) {
        if (eslintFileOrderItem === 'package.json') {
          const eslintConfig = readConfigFile(`${eslintFilesDir}/package.json`)
          if (!eslintConfig) {
            continue
          }
        }

        selectedFile = eslintFileOrderItem
        break
      }
    }
    if (selectedFile !== '') {
      break
    }
  }

  if (!selectedFile) {
    throw new Error(
      'No eslint config file selected. This error should not be seen.',
    )
  }

  return join(eslintFilesDir, selectedFile)
}
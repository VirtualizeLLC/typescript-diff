import { ExecSyncOptions, execSync } from 'child_process'

export interface TscDiffConfig {
  tsconfigPath?: string
  staged?: boolean // staged changes only (will not work with upstream)
  files?: string[]
  upstream?: boolean // upstream changes (will not work with staged)
  remoteName?: string // optional but useful to provide if you do not want to use the "origin" remote
  skipCleanUp?: boolean // allows skipping delete action
  verbose?: boolean
}

interface ErrorObject {
  type: string
  message: string
}

enum ErrorTypes {
  INVALID_CONFIG = 'Invalid Configuration',
}

/**
 * @placeholder for removal process for tsconfig<diff>.json
 */
export const removeTsconfigDiff = () => {}

export const validateConfig = (config: TscDiffConfig) => {
  const errors: ErrorObject[] = []
  if (config.staged && config.upstream) {
    errors.push({
      type: ErrorTypes.INVALID_CONFIG,
      message:
        'staged and upstream detected together, please only provide 1 option, either --staged or --upstream',
    })
  }

  if (
    !config.staged &&
    !config.upstream &&
    (!config.files || config.files?.length === 0)
  ) {
    errors.push({
      type: ErrorTypes.INVALID_CONFIG,
      message:
        'No --staged --upstream flags provided, please provided a flag otherwise no files will be fetched',
    })
  }

  if (errors.length > 0) {
    errors.forEach(({ type, message }) => {
      console.error(type, message)
    })
    throw new Error(errors.toString())
  }
}

const execSyncOptions: ExecSyncOptions = {
  stdio: 'pipe',
  encoding: 'utf-8',
  maxBuffer: 60 * 1024 ** 2,
}

/**
 *
 * @param files
 * @returns
 * @todo possibly leverage simple git
 */
const parseFiles = (files: string | Buffer) => {
  if (typeof files !== 'string') {
    throw new Error('files is not outputing a string')
  }

  if (!files || !files) {
    console.error('files do not exist')
    return []
  }

  return files.split('\n').filter((val) => val !== '')
}

/**
 * @description does a quick git diff to see the changed files
 */
export const getStagedFiles = () => {
  const files = execSync('git diff --staged --name-only', execSyncOptions)
  return parseFiles(files)
}

/**
 * fetches upstream changes and returns the diff with current files
 */
const getUpstreamFiles = (remoteName = 'origin') => {
  const branchName = execSync('git branch --show-current', execSyncOptions)

  const remoteBranch = `${remoteName}/${branchName}`

  execSync(`git fetch ${remoteName}`, execSyncOptions)
  const filesDiff = execSync(
    `git diff --name-only ${remoteBranch}`,
    execSyncOptions,
  )

  return parseFiles(filesDiff)
}

export const tscDiff = (config: TscDiffConfig) => {
  validateConfig(config)

  const files = []

  if (config.staged && !config.upstream) {
    files.push(...getStagedFiles())
  }
  if (config.upstream && !config.staged) {
    files.push(...getUpstreamFiles(config.remoteName))
  }

  return files
}

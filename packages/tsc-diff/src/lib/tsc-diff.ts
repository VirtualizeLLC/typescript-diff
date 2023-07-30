import { ExecSyncOptions, exec, execSync } from "child_process";


export interface TscDiffConfig {
  staged?: boolean // staged changes only (will not work with upstream)
  files?: string[]
  upstream?: boolean // upstream changes (will not work with staged)
  upstreamRemoteName?: string // optional but useful to provide if you do not want to use the "origin" remote
}

interface ErrorObject { type:string; message: string }

enum ErrorTypes {
  INVALID_CONFIG='Invalid Configuration'
}

export const validateConfig = (config: TscDiffConfig) => {
  const errors: ErrorObject[] = []
  if (config.staged && config.upstream){
    errors.push({ type: ErrorTypes.INVALID_CONFIG, message: 'staged and upstream detected together, please only provide 1 option, either --staged or --upstream'})
  }

  if (errors.length > 0){
    errors.forEach(({ type, message }) => {
      console.error(type, message)
    })
    throw new Error(errors.toString())
  }
}


const shellConfig: ExecSyncOptions = { stdio: 'pipe', maxBuffer: 60*1024**2 }

export const getStagedFiles = () => {
  const files = execSync('git diff --staged', shellConfig)

  if (!files || !files){
    console.error('files do not exist')
    return []
  }

  return files
}

/**
 * fetches upstream changes and returns the diff with current files
 */
const getUpstreamFiles = (remoteName = 'origin') => {
  const branchName = execSync('git branch --show-current', shellConfig)

  const remoteBranch = `${remoteName}/${branchName}`

  execSync(`git fetch ${remoteBranch}`,shellConfig)
  const filesDiff = execSync(`git diff --name-only ${remoteBranch}`, shellConfig)

  return filesDiff
}

export const tscDiff = (config: TscDiffConfig) => {
  validateConfig(config)

  const files = []

  if (config.staged && !config.upstream){
    files.push(getStagedFiles())
  }
  if (config.upstream && !config.staged){
    files.push(getUpstreamFiles(config.upstreamRemoteName))
  }

  return files
}

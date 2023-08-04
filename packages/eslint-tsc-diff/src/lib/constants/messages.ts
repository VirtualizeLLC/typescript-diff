const prefix = '@vllc/eslint-tsc-diff'

export enum ErrorMessage {
  NO_ESLINT_FILE_FOUND = `${prefix} No eslint file found, non-recoverable state exiting.`,
}

export enum WarningMessage {
  NO_FILES_TO_INCLUDE = `${prefix} No files to include.`,
}

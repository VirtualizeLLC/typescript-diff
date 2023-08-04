import { ExecSyncOptions } from 'child_process'
import { WriteFileOptions } from 'fs'

export const execSyncOptions: ExecSyncOptions = {
  stdio: 'pipe',
  encoding: 'utf-8',
}

export const writeFileOptions: WriteFileOptions = {
  encoding: 'utf-8',
  flag: 'w',
}

import { ExecSyncOptions } from 'child_process'

export const shellConfig: ExecSyncOptions = {
  stdio: 'pipe',
  encoding: 'utf-8',
}

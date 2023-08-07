import { readFileSync } from 'fs'
import { resolve } from 'path'
import { Command } from 'commander'
import { TscDiffConfig, removeTsconfigDiff, tscDiff } from './lib/tsc-diff'
import { cliSharedOptions } from './lib/cli/cliOptions'

const program = new Command()

const getPackageJson = async (): Promise<{ name: string; version: string }> => {
  const packageJson = readFileSync(
    resolve(__dirname, '../package.json'),
    'utf-8',
  )
  return JSON.parse(packageJson)
}

const runCli = async () => {
  const packageJson = await getPackageJson()

  cliSharedOptions(
    program
      .name(packageJson.name)
      .description(
        'CLI to tsc-diff, allowing typescript compile (tsc) on files related to staged commits and upstream changes and exclude all other files',
      )
      .version(
        packageJson.version,
        '-v, --version',
        'output the current version of the cli',
      )
      .action((config: TscDiffConfig) => {
        tscDiff(config)
      }),
    {
      remoteName: 'origin',
    },
  )

  cliSharedOptions(
    program
      .command('start')
      .description(
        'Runs the config generation part of the command without the cleanup, useful for code that needs to be run in-between',
      )
      .action((options: TscDiffConfig) => {
        tscDiff({ ...options, skipCleanUp: true })
      }),
    {},
  )

  program
    .command('stop')
    .description('removes the current diff output tsconfig.json')
    .action(() => {
      removeTsconfigDiff()
    })
  program.parse(process.argv)
}

runCli()

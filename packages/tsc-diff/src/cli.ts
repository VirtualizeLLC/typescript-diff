import { Command } from 'commander'
import packageJson from '../package.json'
import { TscDiffConfig, removeTsconfigDiff, tscDiff } from './lib/tsc-diff'
import { cliSharedOptions } from './lib/cli/cliOptions'

const program = new Command()

cliSharedOptions(
  program
    .name(packageJson.name)
    .description(
      'CLI to tsc-diff, allowing typescript compile (tsc) on files related to staged commits and upstream changes and exclude all other files',
    )
    .version(packageJson.version)
    .action((config: TscDiffConfig) => {
      console.log('input config:', config)
      const output = tscDiff(config)

      if (config.verbose) {
        console.log('output files:', output)
      }
    }),
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
)

program
  .command('stop')
  .description('removes the current diff output tsconfig.json')
  .action(() => {
    removeTsconfigDiff()
  })
program.parse(process.argv)

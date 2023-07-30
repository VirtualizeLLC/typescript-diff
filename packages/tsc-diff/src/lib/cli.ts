import { Command } from 'commander'
import packageJson from '../../package.json'
import { TscDiffConfig, removeTsconfigDiff, tscDiff } from './tsc-diff'

const program = new Command()

const sharedOptionsWrapper = (commandInstance: typeof program) =>
  commandInstance
    .option(
      '-u, --upstream',
      'check for upstream changes, must provide a --remoteName if the upstreamRemote is not origin, incompatible with (-s|--staged) flags',
      false
    )
    .option(
      '-r --remoteName <string>',
      'remoteName if the target remote to sync is not origin, only required for --upstream flag',
      'origin'
    )
    .option('-s, --staged', '', false)
    .option(
      '--verbose',
      'adds additional logging for outputs. Enabled by default for non-prod releases',
      /**
       * @todo make this boolean based off environment variable when compiling the app
       */
      true
    )

sharedOptionsWrapper(
  program
    .name(packageJson.name)
    .description(
      'CLI to tsc-diff, allowing typescript compile (tsc) on files related to staged commits and upstream changes and exclude all other files'
    )
    .version(packageJson.version)
    .action((config: TscDiffConfig) => {
      console.log('input config:', config)
      const output = tscDiff(config)

      if (config.verbose) {
        console.log('output files:', output)
      }
    })
)

sharedOptionsWrapper(
  program
    .command('start')
    .description(
      'Runs the config generation part of the command without the cleanup, useful for code that needs to be run in-between'
    )
    .action((options: TscDiffConfig) => {
      tscDiff({ ...options, skipCleanUp: true })
    })
)

program
  .command('stop')
  .description('removes the current diff output tsconfig.json')
  .action(() => {
    removeTsconfigDiff()
  })
program.parse(process.argv)

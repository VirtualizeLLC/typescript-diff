import { Command } from 'commander'
import packageJson from '../../package.json'
import { removeTsconfigDiff, tscDiff } from './tsc-diff'

const program = new Command()

program
  .name(packageJson.name)
  .description(
    'CLI to tsc-diff, allowing typescript compile (tsc) on files related to staged commits and upstream changes and exclude all other files'
  )
  .version(packageJson.version)
  .option(
    '-u, --upstream',
    'check for upstream changes, must provide a --remoteName if the upstreamRemote is not origin, incompatible with (-s|--staged) flags',
    false
  )
  .option(
    '--remoteName <string>',
    'remoteName if the target remote to sync is not origin, only required for --upstream flag',
    'origin'
  )
  .option('-s, --staged', '', false)
  .action(({ remoteName, ...rest }) => {
    console.log({ ...rest, upstreamRemoteName: remoteName })
    tscDiff({ ...rest, upstreamRemoteName: remoteName })
  })

program.command('run')
// .description('runs the main app')
// .action((vals, options) => {
//   console.log(vals, options)
//   tscDiff(options)
// })

program
  .command('start')
  .description('Split a string into substrings and display as an array')
  .argument('<string>', 'string to split')
  .option('--first', 'display just the first substring')
  .option('-s, --separator <char>', 'separator character', ',')
  .action((str, options) => {
    const limit = options.first ? 1 : undefined
  })

program
  .command('stop')
  .description('removest the current diff output tsconfig.json')
  .action(() => {
    removeTsconfigDiff()
  })
program.parse(process.argv)

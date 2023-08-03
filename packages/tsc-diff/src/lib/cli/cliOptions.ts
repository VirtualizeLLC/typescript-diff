import { Command } from 'commander'

export const cliSharedOptions = (commandInstance: Command) =>
  commandInstance
    .option(
      '-u, --upstream',
      'check for upstream changes, must provide a --remoteName if the upstreamRemote is not origin, incompatible with (-s|--staged) flags',
      false,
    )
    .option(
      '-r --remoteName <string>',
      'remoteName if the target remote to sync is not origin, only required for --upstream flag',
      'origin',
    )
    .option('-s, --staged', '', false)
    .option(
      '--verbose',
      'adds additional logging for outputs. Enabled by default for non-prod releases',
      /**
       * @todo make this boolean based off environment variable when compiling the app
       */
      true,
    )

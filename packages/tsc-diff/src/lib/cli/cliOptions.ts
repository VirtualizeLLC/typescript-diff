import { Command } from 'commander'
import { TscDiffConfig } from '../tsc-diff'

export const cliSharedOptions = (
  commandInstance: Command,
  configDefaults: Pick<
    TscDiffConfig,
    'verbose' | 'remoteName' | 'upstream' | 'staged'
  >,
) =>
  commandInstance
    .option(
      '-u, --upstream',
      'check for upstream changes, must provide a --remoteName if the upstreamRemote is not origin, incompatible with (-s|--staged) flags',
      configDefaults.upstream,
    )
    .option(
      '-s, --staged',
      'checks for staged changes only',
      configDefaults.staged,
    )
    .option(
      '--verbose',
      'adds additional logging for outputs. Enabled by default for non-prod releases',
      /**
       * @todo make this boolean based off environment variable when compiling the app
       */
      configDefaults.verbose,
    )
    .option(
      '-r --remote-name <string>',
      'remoteName if the target remote to sync is not origin, only required for --upstream flag',
      configDefaults.remoteName,
    )

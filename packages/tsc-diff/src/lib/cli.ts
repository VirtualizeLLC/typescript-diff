import { Command } from 'commander'
import packageJson from '../../package.json'

const program = new Command()

program
  .name(packageJson.name)
  .description(
    'CLI to tsc-diff, allowing typescript compile (tsc) on files related to staged commits and upstream changes and exclude all other files'
  )
  .version(packageJson.version)

program
  .command('')
  .description('Split a string into substrings and display as an array')
  .argument('<string>', 'string to split')
  .option('--first', 'display just the first substring')
  .option('-s, --separator <char>', 'separator character', ',')
  .action((str, options) => {
    const limit = options.first ? 1 : undefined
    console.log(str.split(options.separator, limit))
  })

program.parse(process.argv)

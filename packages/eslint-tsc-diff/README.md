# eslint-tsc-diff

## API

`--print-config` will output the config for the cli. Useful for debugging issues / bug reporting.

## Config File

1. Add a `.eslint-tsc-diff.json` to your project's rootDirectory
2. When running the cli, the cli will automatically detect and inject the variables from `.eslint-tsc-diff.json`
   - Inspect the cli `--help` defaults to confirm defaults are applied or run `--print-config` to confirm that the config is applying
   - `--verbose` verbose mode will let you know if it was successful. Noting that verbose mode can be set from the config too.

## Building

Run `nx build eslint-tsc-diff` to build the library.

## Running unit tests

Run `nx test eslint-tsc-diff` to execute the unit tests via [Jest](https://jestjs.io).

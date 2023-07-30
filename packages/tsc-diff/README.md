# tsc-diff

The main lib used to run typescript compile (tsc) on files related to staged commits and upstream changes and exclude all other files.

Running `tsc` on all files can take extreme amounts of time with mid - monorepo size projects. This plugin should make a once lengthy process happen in seconds.

## Use cases

1. My project has 10000+ lines of code but I want to lint files fast.
2. 1-3 second pre-commit hooks. Noting: Merge commits may take longer if you run pre-commit hooks on merges.

## Q&A

Q: Why is tsc-staged running on File X when I only changed File Y?
A: Most likely because FileY is included in your dependency chain. You can run something like `npx dpdm ./path/to/fileY` and it will list all the files imported by the File. Your file should be there.

## Args

This section will be auto-generated in upcoming releases.

- `--files` a list of files sent from a custom git diff
- `--staged` a list of files brought in from the staged
- `--upstream` checks local changes against upstream. Use this in `pre-push` hook.
- `--help` lists all supported commands.

## Building

Run `nx build tsc-staged` to build the library.

## Running unit tests

Run `nx test tsc-staged` to execute the unit tests via [Jest](https://jestjs.io).

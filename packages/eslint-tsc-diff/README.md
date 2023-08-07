# eslint-tsc-diff

[![npm package][npm-img-eslint-tsc-diff]][npm-url-eslint-tsc-diff]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img-eslint-tsc-diff]][downloads-url-eslint-tsc-diff]

## Typescript Diff Monorepo

[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release[semantic-release-ur]][semantic-release-img]]

For more information on other packages go [here](https://github.com/VirtualizeLLC/typescript-diff#README)

## API

`--print-config` will output the config for the cli. Useful for debugging issues / bug reporting.

## Installing

Typicall this is a dev only solution, unless your package is shipping this dependency as part of it's toolchain. Examples below show how to install it in your package with `--dev`/`-D` flag commands.

### npm

> `npm i -D @vllc/eslint-tsc-diff`

### pnpm

> `pnpm i -D @vllc/eslint-tsc-diff`

### yarn

> `yarn add -D @vllc/eslint-tsc-diff`

## Global Install and use cli

## Integrating eslint-tsc-diff

To integrate eslint-tsc-diff into your workflow please add it to your git hooks.

> husky pre-commit

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm run eslint-diff:st

git add .
```

Not that the `git add .` is required to commit your changes provided the `--fix` flag made changes.

> husky pre-push

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Option 1
# npx @vllc/eslint-tsc-diff --staged
# Option 2
# node_modules/@vllc/eslint-tsc-diff
```

### npm global

> `npm i -g @vllc/eslint-tsc-diff`

### pnpm global

> `pnpm i -g @vllc/eslint-tsc-diff`

### yarn global

> `yarn global add @vllc/eslint-tsc-diff`

Run the command `eslint-tsc-diff`. It should now exist and run just like using `npx` | `yarn` | `pnpx`

## Config File

1. Add a `.eslint-tsc-diff.json` to your project's rootDirectory
2. When running the cli, the cli will automatically detect and inject the variables from `.eslint-tsc-diff.json`
   - Inspect the cli `--help` defaults to confirm defaults are applied or run `--print-config` to confirm that the config is applying
   - `--verbose` verbose mode will let you know if it was successful. Noting that verbose mode can be set from the config too.

## Building

Run `nx build eslint-tsc-diff` to build the library.

## Running unit tests

Run `nx test eslint-tsc-diff` to execute the unit tests via [Jest](https://jestjs.io).

[build-img]: https://github.com/VirtualizeLLC/typescript-diff/actions/workflows/release.yml/badge.svg
[build-url]: https://github.com/VirtualizeLLC/typescript-diff/actions/workflows/release.yml

<!--  -->

[downloads-img-eslint-tsc-diff]: https://img.shields.io/npm/dt/@vllc/eslint-tsc-diff
[downloads-url-eslint-tsc-diff]: https://npmtrends.com/@vllc/eslint-tsc-diff

<!--  -->

[npm-img-eslint-tsc-diff]: https://img.shields.io/npm/v/@vllc/eslint-tsc-diff
[npm-url-eslint-tsc-diff]: https://www.npmjs.com/package/@vllc/eslint-tsc-diff

<!--  -->

[issues-img]: https://img.shields.io/github/issues/VirtualizeLLC/typescript-diff
[issues-url]: https://github.com/VirtualizeLLC/typescript-diff/issues

<!--  -->

[codecov-img]: https://codecov.io/gh/VirtualizeLLC/typescript-diff/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/VirtualizeLLC/typescript-diff

<!--  -->

[semantic-release-img]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[commitizen-img]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/

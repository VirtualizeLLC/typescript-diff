# typescript-utils monorepo

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

## Features

This monorepo encompasses 1 utility `@tsc-diff/` which is used to run eslint and jest. There are two packages specific to [eslint](https://eslint.org/) and [jest](https://jestjs.io/) to make running pre-commit and pre-push hooks easier. `@tsc-diff/` also fully supports being run in isolatation and piping changes to custom test runners.

If you have a tool/test-runner that you think needs to be supported please file an issue and consider contributing to add support for this tool.

- Adds the ability to run tsc with your project's current config but only include specific files.
- [@tsc-diff/](./packages/tsc-diff#README) - main package, compiles only staged files
- [@tsc-diff/eslint](./packages/tsc-diff-eslint#README) - eslint support
- [@tsc-diff/jest](./packages/tsc-diff#README) - jest support
  - Adds a compatibility script to directly mutate the tsconfig.json file (with backups) for babel-jest, which may work well with esbuild and swc-jest
  - Adds wrapper around jest so it runs `ts-jest` with the staged tsconfig file.

Not for monorepos using eslint please consider using the EXPERIMENTAL_useProjectService

```javascript
modules.export = {
  parserOptions: {
    EXPERIMENTAL_useProjectService: true,
  },
}
```

## Compatibility

- `@vllc/ts-diff`: Node 12.x.x - 20.x.x
- `@vllc/ts-diff-eslint`: Eslint >=6 (using 8.x.x - locally)
- `@vllc/ts-diff-jest`: Jest >=22 (using 29 - locally)

## Getting started

> typescript-utils monorepo packages

## Install

> @tsc-diff/eslint

Install this package for eslint to run tsc only on the test files dependency tree.

```bash
npm install -D @tsc-diff/eslint
```

> @tsc-diff/jest

Install this package for jest to run tsc only on the test files dependency tree

```bash
npm install -D @tsc-diff/jest
```

> @tsc-diff/

Install this package for getting the staged and upstream diff file output with flexibility such as `@tsc-diff/ start` and `@tsc-diff/ stop` to cleanup the dynamic tsconfig.json file generated.

```bash
npm install -D @tsc-diff/
```

## Usage

WIP

## API

WIP, this will be dynamically generated

### tsc-diff(input, options?)

#### input

Type: `string`

Lorem ipsum.

#### options

Type: `object`

##### postfix

Type: `string`
Default: `rainbows`

[build-img]: https://github.com/VirtualizeLLC/typescript-utils/actions/workflows/release.yml/badge.svg
[build-url]: https://github.com/VirtualizeLLC/typescript-utils/actions/workflows/release.yml
[downloads-img]: https://img.shields.io/npm/dt/typescript-npm-package-template
[downloads-url]: https://www.npmtrends.com/typescript-npm-package-template
[npm-img]: https://img.shields.io/npm/v/typescript-npm-package-template
[npm-url]: https://www.npmjs.com/package/typescript-npm-package-template
[issues-img]: https://img.shields.io/github/issues/VirtualizeLLC/typescript-utils
[issues-url]: https://github.com/VirtualizeLLC/typescript-utils/issues
[codecov-img]: https://codecov.io/gh/VirtualizeLLC/typescript-utils/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/VirtualizeLLC/typescript-utils
[semantic-release-img]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[commitizen-img]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/

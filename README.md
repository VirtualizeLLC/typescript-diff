# typescript-utils monorepo

[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]]

A combination of helpful typescript packages that make tools like jest and eslint to behave more efficiently for projects that need to scale.

Please reference the individual packages below.

## Packages

### [@vllc/tsc-diff](./packages/tsc-diff#README)

[![npm package][npm-img-tsc-diff]][npm-url-tsc-diff]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img-tsc-diff]][downloads-url-tsc-diff]

### [@vllc/eslint-tsc-diff](./packages/eslint-tsc-diff#README)

[![npm package][npm-img-eslint-tsc-diff]][npm-url-eslint-tsc-diff]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img-eslint-tsc-diff]][downloads-url-eslint-tsc-diff]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

## Disclaimer

This repo is WIP. Please wait for an official release before attempting to use this package.

If you cannot wait, please reference the develop branch for experimental features.

This tool also may be **slightly** less useful in higher versions of @typescript/eslint-parser as there is a experimental key which will compile only project files EXPERIMENTAL_useProjectService

```javascript
modules.export = {
  parserOptions: {
    EXPERIMENTAL_useProjectService: true,
  },
}
```

[Link to repo docs](https://typescript-eslint.io/packages/parser/#experimental_useprojectservice)

- If you have massive typescript projects, using something like NX for caching typescript builds and running typescript compile only on staged or upstream files is still the way to go for linting fast.

## Features

This monorepo encompasses 1 utility `tsc-diff` which is used to run eslint and jest. There are two packages specific to [eslint](https://eslint.org/).

If you have a tool/test-runner that you think needs to be supported please file an issue and consider contributing to add support for this tool.

- Adds the ability to run tsc with your project's current config but only include specific files.

## Compatibility

- `@vllc/tsc-diff`: Node 12.x.x - 20.x.x
- `@vllc/eslint-tsc-diff`: Eslint >=6 (using 8.x.x - locally)
<!-- - `@vllc/jest-tsc-diff`: **WIP** **Jest >=22 (using 29 - locally)** -->

## Getting started

> typescript-utils monorepo packages

## Install

> @vllc/eslint-tsc-diff

Install this package for eslint to run tsc only on the test files dependency tree.

```bash
npm install -D @vllc/tsc-diff-eslint
```

> @vllc/jest-tsc-diff

Install this package for jest to run tsc only on the test files dependency tree

```bash
npm install -D @vllc/eslint-ts-diff
```

> @vllc/tsc-diff

Install this package for getting the staged and upstream diff file output with flexibility such as `@vllc/tsc-diff- start` and `@vllc/tsc-diff- stop` to cleanup the dynamic tsconfig.json file generated.

```bash
npm install -D @vllc/tsc-diff
```

## Usage

WIP

## Upcoming Features

[jest](https://jestjs.io/) to make running pre-commit and pre-push hooks easier. `jest-tsc-diff` will also fully supports being run in isolatation and piping changes to custom test runners.

- [@vllc/jest-tsc-diff](./packages/jest-tsc-diff#README) - **NOT BUILT YET**. jest support
  - Adds a compatibility script to directly mutate the tsconfig.json file (with backups) for babel-jest, which may work well with esbuild and swc-jest
  - Adds wrapper around jest so it runs `ts-jest` with the staged tsconfig file.

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
[downloads-img-eslint-tsc-diff]: https://img.shields.io/npm/dt/@vllc/eslint-tsc-diff
[downloads-img-tsc-diff]: https://img.shields.io/npm/dt/@vllc/tsc-diff
[downloads-url-eslint-tsc-diff]: https://npmtrends.com/@vllc/eslint-tsc-diff
[downloads-url-tsc-diff]: https://npmtrends.com/@vllc/tsc-diff

<!-- TSCD -->
<!-- img -->

[npm-img-eslint-tsc-diff]: https://img.shields.io/npm/v/@vllc/eslint-tsc-diff
[npm-img-tsc-diff]: https://img.shields.io/npm/v/@vllc/tsc-diff

<!-- url -->

[npm-url-eslint-tsc-diff]: https://www.npmjs.com/package/@vllc/eslint-tsc-diff
[npm-url-tsc-diff]: https://www.npmjs.com/package/@vllc/tsc-diff

<!-- rest -->

[issues-img]: https://img.shields.io/github/issues/VirtualizeLLC/typescript-utils
[issues-url]: https://github.com/VirtualizeLLC/typescript-utils/issues
[codecov-img]: https://codecov.io/gh/VirtualizeLLC/typescript-utils/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/VirtualizeLLC/typescript-utils
[semantic-release-img]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[commitizen-img]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/

## Getting Started

This package uses pnpm. To install pnpm run `npm i -g pnpm`.

Please use `fnm` or another node manager and make sure you are on node 20.

This project runs on latest node. But compiles backwards for LTS support.

Install dependencies

```shell
pnpm install
```

## Building

This monorepo is managed by `nx` which efficiently will rebuild the app based on file changes.

Build the entire repo

```shell
nx run-many -t build
```

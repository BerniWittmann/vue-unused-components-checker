# Vue Unused Components Checker

Check your Vue project for unused Components.

This tool gathers all file names of `.vue` Components and check whether they are imported and used somewhere.

<p align="center" class="text-center">
  <img alt="" src="https://img.shields.io/github/workflow/status/BerniWittmann/vue-unused-components-checker/Release/main"/>
  <img alt="" src="https://shields.io/github/issues/BerniWittmann/vue-unused-components-checker"/>
  <img alt="" src="https://shields.io/npm/l/vue-unused-components-checker"/>
  <img alt="" src="https://shields.io/npm/v/vue-unused-components-checker"/>
</p>

<p align="center" class="text-center">
  <img alt="" src="https://i.imgur.com/3SJ5CeK.gif" />
</p>

## Purpose

To help eliminate dead code in your Vue project, this package scans your codebase for components that have not been imported anywhere and thus are unused, so you can spot and remove them easily.

## Installation

You should have [node](https://nodejs.org/en/) and npm or [yarn](https://yarnpkg.com) installed.

```bash
$ npm install vue-unused-components-checker -g
```

## Basic Usage

Check the current file tree

```bash
$ check-unused-comp .
```

Check a specific folder

```bash
$ check-unused-comp src/js
```

Limit the count of open files, since this can lead to errors, when directories are too large

```bash
$ check-unused-comp -o 20 src/js
```

Ignore specific files using [glob](https://www.npmjs.com/package/glob#glob-primer) patterns. Default: `**/{node_modules,.nuxt,dist,coverage}/**`

```bash
$ check-unused-comp -i **/node_modules/** src/js
```

Check for components that are [dynamically imported via Nuxt](https://nuxtjs.org/docs/directory-structure/components/#dynamic-imports)
```bash
$ check-unused-comp -d
```

## Documentation

> Refer to the basic instructions above. More thorough documentation will be added asap.

## Changelog

For a list of changes, please refer to the [CHANGELOG](CHANGELOG.md).

## Contributions

Contributions are more than welcome, check our [CONTRIBUTING Guide](CONTRIBUTING.md).

## License

[MIT licensed](LICENSE).

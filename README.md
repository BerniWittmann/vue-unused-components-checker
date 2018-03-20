# Vue Unused Components Checker

Check your Vue project for unused Components.

This tool gathers all file names of `.vue` Components and check whether they are imported and used somewhere.

## Installation

This module is installed via npm:

``` bash
$ npm install vue-unused-components-checker -g
```

## Example Usage

``` bash
$ check-unused-comp .    #Checks the current file tree
```

``` bash
$ check-unused-comp src/js 
```

``` bash
$ check-unused-comp -o 20 src/js 
```

Limit the count of open files, since this can lead to errors.

#!/usr/bin/env node
var program = require('commander');
var path = require('path');

var checker = require('./checker');

program
  .arguments('<src>')
  .option('-o, --openfiles <number>', 'Number of Max Open files')
  .option('-i, --ignore <glob>', 'glob pattern or Array of glob patterns to ignore', ['**/node_modules/**', '**/.nuxt/**', '**/dist/**', '**/coverage/**'])
  .action(function (src) {
    var completePath = src ? path.join(process.cwd(), src) : process.cwd();
    checker(completePath, program.openfiles, program.ignore);
  })
  .parse(process.argv);

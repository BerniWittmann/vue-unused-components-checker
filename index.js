#!/usr/bin/env node
var program = require('commander');
var path = require('path');

var checker = require('./checker');

program
  .version('1.2.0')
  .arguments('[src]')
  .description('Lists unused vue components in project', {
    src: 'Root folder to inspect, if not provided, will default to current folder'
  })
  .option('-o, --openfiles <number>', 'Number of Max Open files')
  .option('-i, --ignore <glob>', 'glob pattern or Array of glob patterns to ignore', ['**/node_modules/**', '**/.nuxt/**', '**/dist/**', '**/coverage/**'])
  .action(function (src, options, command) {
    const completePath = src ? path.join(process.cwd(), src) : process.cwd();
    console.log("Checking unused components from root folder: ", completePath)
    checker(completePath, options.openfiles, options.ignore);
  })
  .parse(process.argv);

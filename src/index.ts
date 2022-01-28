#!/usr/bin/env node
import { program } from 'commander';
import path from 'path';

import checker from './checker';

program
  .arguments('[src]')
  .description('Lists unused vue components in project', {
    src: 'Root folder to inspect, if not provided, will default to current folder',
  })
  .option('-o, --openfiles <number>', 'Number of Max Open files')
  .option(
    '-i, --ignore <glob>',
    'glob pattern or Array of glob patterns to ignore',
    '**/{node_modules,.nuxt,dist,coverage}/**',
  )
  .option(
    '-d, --dynamic',
    'Handle dynamic-component imports (such as via nuxt)'
  )
  .action(function (src, options) {
    const completePath = src ? path.join(process.cwd(), src) : process.cwd();
    checker(completePath, options.openfiles, options.ignore, options.dynamic);
  })
  .parse(process.argv);

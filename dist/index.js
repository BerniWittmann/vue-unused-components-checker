#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const path_1 = __importDefault(require("path"));
const checker_1 = __importDefault(require("./checker"));
commander_1.program
    .arguments('[src]')
    .description('Lists unused vue components in project', {
    src: 'Root folder to inspect, if not provided, will default to current folder',
})
    .option('-o, --openfiles <number>', 'Number of Max Open files')
    .option('-i, --ignore <glob>', 'glob pattern or Array of glob patterns to ignore', '**/{node_modules,.nuxt,dist,coverage}/**')
    .option('-d, --dynamic', 'Handle dynamic-component imports (such as via nuxt)')
    .action(function (src, options) {
    const completePath = src ? path_1.default.join(process.cwd(), src) : process.cwd();
    checker_1.default(completePath, options.openfiles, options.ignore, options.dynamic);
})
    .parse(process.argv);
//# sourceMappingURL=index.js.map
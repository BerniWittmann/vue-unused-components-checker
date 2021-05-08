"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheckExpression = void 0;
const ora_1 = __importDefault(require("ora"));
const textSearch = __importStar(require("rx-text-search"));
const async_1 = __importDefault(require("async"));
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
function getCheckExpression(file) {
    return `(import|require).*(?:[\'\"]\\b|\\/)${path_1.default.basename(file, path_1.default.extname(file))}(?:\\.(?:vue))?[\'\"][\\\);,]?[,;]?`;
}
exports.getCheckExpression = getCheckExpression;
function default_1(src, maxOpenFiles, ignore) {
    const spinner = ora_1.default('Checking for unused Components').start();
    glob_1.default('**/*.vue', {
        cwd: src,
        ignore: ignore,
    }, function (err, files) {
        if (err) {
            throw err;
        }
        const results = [];
        async_1.default.eachOfLimit(files, maxOpenFiles || 30, function (file, index, cb) {
            spinner.text = 'Checking for unused Components: ' + file;
            textSearch
                .findAsPromise(new RegExp(getCheckExpression(file), 'i'), ['**/*.{js,jsx,ts,tsx}', '**/*.vue'], {
                cwd: src,
                ignore: ignore,
            })
                .then(function (result) {
                if (result.length === 0) {
                    results.push(file);
                }
                cb();
            })
                .catch(cb);
        }, function (err) {
            if (err) {
                spinner.fail('Error');
                console.error(err);
                process.exit(1);
            }
            if (results.length === 0) {
                spinner.succeed('No unused Components found.');
                process.exit(0);
            }
            else {
                results.forEach(function (result) {
                    spinner.stopAndPersist({
                        text: result,
                        symbol: '-',
                        color: 'red',
                    });
                    spinner.start('Checking for unused Components');
                });
                spinner.fail(results.length + ' unused Component' + (results.length > 1 ? 's' : '') + ' found.');
                process.exit(1);
            }
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=checker.js.map
import ora from 'ora';
import * as textSearch from 'rx-text-search';
import async from 'async';
import path from 'path';
import glob from 'glob';

export function getDynamicImportName(file): string {
  if (file.includes('components')) {
    return file.replace(/.*\/?components\//, '').replace(/\.[a-z]{2,3}$/, '').split('/').reduce((fullName, path) => {
      return fullName.charAt(0).toUpperCase() + fullName.slice(1) + path.charAt(0).toUpperCase() + path.slice(1)
    })
  }
  return null
}

export function getCheckExpression(file, dynamic = false): string {
  let dynamicComponentName = getDynamicImportName(file)
  if (dynamic && dynamicComponentName) {
    // Add optional dashes between words
    dynamicComponentName = dynamicComponentName.match(/([A-Z]?[^A-Z]*)/g).slice(0,-1).join("-?")
    return `(?<!(name: ))((<)|'|"|\`)(Lazy)?-?${dynamicComponentName}((2)?($|\n| |\/>)|('|"|\`))`
  }
  return `(import|require).*(?:[\'\"]\\b|\\/)${path.basename(file, path.extname(file))}(?:\\.(?:vue))?[\'\"][\\\);,]?[,;]?`;
}

export default function (src, maxOpenFiles, ignore, dynamic): void {
  const spinner = ora('Checking for unused Components').start();
  glob(
    '**/*.vue',
    {
      cwd: src,
      ignore: ignore,
    },
    function (err, files) {
      if (err) {
        throw err;
      }
      const results = [];
      async.eachOfLimit(
        files,
        maxOpenFiles || 30,
        function (file, index, cb) {
          spinner.text = 'Checking for unused Components: ' + file;
          textSearch
            .findAsPromise(new RegExp(getCheckExpression(file, dynamic), 'i'), ['**/*.{js,jsx,ts,tsx}', '**/*.vue'], {
              cwd: src,
              ignore: ignore,
            })
            .then(function (result) {
              if (result.length === 0 && (!dynamic || file.includes('/components/'))) {
                results.push(file);
              }
              cb();
            })
            .catch(cb);
        },
        function (err) {
          if (err) {
            spinner.fail('Error');
            console.error(err);
            process.exit(1);
          }

          if (results.length === 0) {
            spinner.succeed('No unused Components found.');
            process.exit(0);
          } else {
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
        },
      );
    },
  );
}

var ora = require('ora');
var textSearch = require('rx-text-search');
var async = require('async');
var path = require('path');

var utils = require('./utils');

module.exports = function (src, maxOpenFiles) {
  const spinner = ora('Checking for unused Components').start();

  const files = [];
  utils.filesFromDir(src, /\.vue/, function (filename) {
    files.push(filename);
  });

  const results = [];
  async.eachOfLimit(files, maxOpenFiles || 30, function (file, index, cb) {
    textSearch.findAsPromise('./' + path.basename(file), ['**/*.js', '**/*.vue'], { cwd: src })
      .then(function (result) {
        if (result.length === 0) {
          results.push(path.relative(src, file));
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
    } else {
      results.forEach(function (result) {
        spinner.stopAndPersist({
          text: result,
          symbol: '-',
          color: 'red'
        });
        spinner.start('Checking for unused Components');
      });
      spinner.fail(results.length + ' unused Component' + (results.length > 1 ? 's' : '') + ' found.');
      process.exit(1);
    }
  });
};
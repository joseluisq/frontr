#!/usr/bin/env node

/*
 * frontierjs-app Command-line for node.js
 */

'use strict';

var path = require('path');
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
var args = argv._;
var pkgdir = path.dirname(path.join(fs.realpathSync(__filename), '../'));
var cwd = process.cwd();
var pkg = JSON.parse(fs.readFileSync(path.join(pkgdir, 'package.json')));

// http://www.geedew.com/remove-a-directory-that-is-not-empty-in-nodejs/
var rmdirAsync = function(path, callback) {
  fs.readdir(path, function(err, files) {
    if (err) {
      // Pass the error on to callback
      callback(err, []);
      return;
    }

    var wait = files.length,
      count = 0,
      folderDone = function(err) {
        count++;
        // If we cleaned out all the files, continue
        if (count >= wait || err) {
          fs.rmdir(path, callback);
        }
      };

    // Empty directory to bail early
    if (!wait) {
      folderDone();
      return;
    }

    // Remove one or more trailing slash to keep from doubling up
    path = path.replace(/\/+$/, '');

    files.forEach(function(file) {
      var curPath = path + '/' + file;

      fs.lstat(curPath, function(err, stats) {
        if (err) {
          callback(err, []);
          return;
        }
        if (stats.isDirectory()) {
          rmdirAsync(curPath, folderDone);
        } else {
          fs.unlink(curPath, folderDone);
        }
      });
    });
  });
};

// Project Object
var Project = function() {
  var s = this;

  this.make = function(cwd, name) {
    console.log('  FrontierJS v' + pkg.version);
    console.log('====================');

    this.mkdir(cwd, name, function(dest, name) {
      s.initStructure(dest, name);
    });
  };

  this.mkdir = function(cwd, name, next) {
    if (name) {
      var dest = path.join(cwd, name);

      fs.mkdir(dest, function(e) {
        if (e) {
          console.error(e);
        } else {
          next(dest, name);
        }
      });
    } else {
      console.error('>> Please enter a name for your project.');
    }
  };

  this.initStructure = function(dest, name) {
    this.getStructure(dest, function() {
      var gitdir = path.join(dest, '.git');

      rmdirAsync(gitdir, function() {
        console.info('= Project `' + name + '` was created successfully at: \n' + dest);
        console.info('> First:');
        console.info('  Enter to your project folder: `cd ' + name + '`');
        console.info('> Then: ');
        console.info('  Install dependencies: `npm install`');
      });

    });
  };

  this.getStructure = function(dest, next) {
    var clone = require('nodegit').Clone.clone;
    clone('https://github.com/joseluisq/frontierjs-app.git', dest, null).then(next);
  };
};

// Bootstrap
var cmd;
var cmdval;
var proj;

if (args && args.length > 0) {
  cmd = args[0];
  cmdval = args[1];
  proj = new Project();

  switch (cmd) {
    case 'new':
      proj.make(cwd, cmdval);
      break;

    default:
      console.error('>> This is not a valid option.');
      break;
  }
} else {
  console.error('>> Please enter some valid option.');
}

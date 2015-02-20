#!/usr/bin/env node

'use strict';

var Frontr = require('./');
var meow = require('meow');

var cli = meow({
  help: [
    'Usage:',
    '  frontr --new <project-name>   Create a new project',
    '',
    'Options:',
    '  -n, --new              Create a new project',
    '  -h, --help             Show this help',
    '  -v, --version          Show the version',
    '',
  ].join('\n')
}, {
  string: [
    'new'
  ],
  alias: {
    n: 'new',
    h: 'help',
    v: 'version'
  }
});

function start() {
  var pkg = cli.pkg;
  var info = '\n' + pkg.name[0].toUpperCase() + pkg.name.slice(1) + '@' + pkg.version;

  console.info(info);
}

function finish(strname) {
  var info = [
    '',
    'Your project was created successfully!',
    '',
    'Two steps to finish:',
    '- Enter to your project folder:',
    '  > cd ' + strname,
    '',
    '- Then, install dependencies for your project:',
    '  > npm install',
    '',
    'Happy coding!',
    ''
  ];

  console.info(info.join('\n'));
}

function create(strname) {
  var frontr = new Frontr(strname);

  start();

  frontr.create(function(err) {
    if (err) {
      console.error(err.message);
      process.exit(1);
    }

    finish(strname);
  });
}

if (process.stdin.isTTY) {
  var strname = cli.flags.new;

  if (!strname) {
    console.error([
      'Specify a project name folder',
      '',
      'Example',
      '  frontr --new myapp',
      ''
    ].join('\n'));

    process.exit(1);
  }

  create(strname);
} else {
  stdin(function(data) {
    var strname = cli.flags.new;

    create(strname);
  });
}

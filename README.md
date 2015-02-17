# Frontr [![Build Status](http://img.shields.io/travis/joseluisq/frontr.svg?style=flat-square)](https://travis-ci.org/joseluisq/frontr)

> A simple HTML5 and Sass Front-End base.

### Features

* [HTML5 Boilerplate](http://html5boilerplate.com/) front-end template
* [Gruntjs](http://gruntjs.org/) for Server and Build tasks
* [Bower](http://bower.io/) for dependencies managment
* [Sass](http://http://sass-lang.com/) pre-processor (With [libsass](https://github.com/sass/libsass) compiler)
* [Pure](http://purecss.io/) CSS Framework v5.0 (or any you want)
* [jQuery](http://jquery.com/) JS Framework
* [Modernizr](http://modernizr.com/) JS library

### Requirements
It's necessary to install the following packages before:

* [Nodejs](http://nodejs.org/) >= 0.10.0
* [Gruntjs](http://gruntjs.com/) >= 0.4.0
* [Bower](http://bower.io/) >= 1.3.10

### How to use

#### Installation

```sh
$ npm install frontr -g
```

#### Usage

**Create a project**

```sh
$ frontr --new my-project-name
```

**Run development server**

Start development server and preview the project. Located at `app/` dir.

```sh
$ grunt serve
```

**Build dist files**

Generate a dist files at `dist/` dir.

```sh
$ grunt build
```

**Run dist server**

Run dist server with deployed files located at `dist/` dir.

```sh
$ grunt dist
```

**Remote access**

For remote access in network using `--remote-access` option.

```sh
$ grunt serve --remote-access
# or
$ grunt dist --remote-access
```

**Note:** For ***remote access*** in ***Windows OS*** using the network IP instead 0.0.0.0


### CLI

```sh
$ frontr --help

  Usage:
    --new <project-name>   Create a new project

  Options:
    -n, --new              Create a new project
    -h, --help             Show this help
    -v, --version          Show the version

```

### History
Check out [the releases](https://github.com/joseluisq/frontr/releases) changelog.

### License

MIT Licence

'use strict';

var Download = require('download');

/**
 * Initialize Frontr
 *
 * @param {string} Project name
 * @access public
 */
function Frontr(strname) {
  if (!(this instanceof Frontr)) {
    return new Frontr(strname);
  }

  this.strname = strname;
  this.apprelease = '1.0.7';
  this.zipball = 'https://github.com/joseluisq/frontr-app/archive/' + this.apprelease + '.zip';
}

/**
 * Create the project
 *
 * @param {function} Callback
 * @access public
 */
Frontr.prototype.create = function(cb) {
  if (this.strname) {
    this.fetch(function(err) {
      if (err) {
        throw err;
      }

      cb();
    });

    return this;
  } else {
    return false;
  }
};

/**
 * Fetch the project source files
 *
 * @param {function} Callback
 * @access public
 */
Frontr.prototype.fetch = function(cb) {
  var download = new Download({
      extract: true,
      strip: 1,
      mode: '755'
    })
    .get(this.zipball)
    .dest(this.strname);

  download.run(cb);
};

module.exports = Frontr;

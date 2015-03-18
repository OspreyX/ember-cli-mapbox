'use strict';

module.exports = {
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    this.insertIntoFile('.jshintrc', '    "L",', {
      after: '"predef": [\n'
    });

    return this.insertIntoFile('.gitignore', '.mapbox');
  },
};

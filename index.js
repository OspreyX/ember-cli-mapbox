/* jshint node: true */
'use strict';

var readConfig = require('./lib/config');
var path = require('path');
var fs = require('fs');
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-mapbox',

  unwatchedTree: function(dir) {
    return {
      read:    function() { return dir; },
      cleanup: function() { }
    };
  },

  treeFor: function(name) {
    var treePath =  path.join('node_modules', 'ember-cli-mapbox', name);

    if (fs.existsSync(treePath)) {
      return this.unwatchedTree(treePath);
    }
  },

  included: function(app) {
    app.import('vendor/mapbox.js/dist/mapbox.uncompressed.js');
    app.import('vendor/mapbox.js/dist/mapbox.uncompressed.css');
  },

  postprocessTree: function(type, workingTree) {
    if (type === 'all') {
      var treePath = path.join('node_modules', 'ember-cli-mapbox', 'vendor', 'mapbox.js', 'dist');
      var staticFiles = pickFiles(this.unwatchedTree(treePath), {
        srcDir: 'images',
        files: ['icons.svg', '*.png', 'images/*.png'],
        destDir: '/assets/images'
      });

      return mergeTrees([workingTree, staticFiles]);
    } else {
      return workingTree;
    }
  },

  contentFor: function(type, config) {
    return [
      '<script>',
      'L.mapbox.accessToken = "' + readConfig().accessToken + '";',
      '</script>',
    ];
  }
};

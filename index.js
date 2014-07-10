var path = require('path');
var fs = require('fs');
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');

function unwatchedTree(dir) {
  return {
    read:    function() { return dir; },
    cleanup: function() { }
  };
}

function EmberCLIMapbox(project) {
  this.project = project;
  this.name = 'Mapbox for Ember CLI';
}

EmberCLIMapbox.prototype.treeFor = function treeFor(name) {
  var treePath =  path.join('node_modules', 'ember-cli-mapbox', name);
  
  if (fs.existsSync(treePath)) {
    return unwatchedTree(treePath);
  }
};

EmberCLIMapbox.prototype.included = function included(app) {
  app.import('vendor/mapbox.js/dist/mapbox.uncompressed.js');
  app.import('vendor/mapbox.js/dist/mapbox.uncompressed.css');
};

EmberCLIMapbox.prototype.postprocessTree = function postprocessTree(type, workingTree) {
  if (type === 'all') {
    var treePath = path.join('node_modules', 'ember-cli-mapbox', 'vendor', 'mapbox.js', 'dist');
    var staticFiles = pickFiles(unwatchedTree(treePath), {
      srcDir: 'images',
      files: ['icons.svg', '*.png', 'images/*.png'],
      destDir: '/assets/images'
    });

    return mergeTrees([workingTree, staticFiles]);
  } else {
    return workingTree;
  }
};

module.exports = EmberCLIMapbox;

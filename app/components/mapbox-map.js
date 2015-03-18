import Ember from 'ember';

export default Ember.Component.extend({
  mapService: Ember.inject.service('map'),

  setup: function() {
    var mapService = this.get('mapService');
    mapService.setupMap();
  }.on('didInsertElement'),
});

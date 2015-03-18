import MapboxService from '../services/mapbox';

export default {
  name: 'mapbox-service',

  initialize: function(container, application) {
    application.register('service:mapbox', MapboxService);
  }
};

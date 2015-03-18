import Ember from 'ember';

export default Ember.Service.extend({
  markers: {},

  setupMap: function(id) {
    this.set('map', L.mapbox.map('map', id));
  },

  setMarker: function(id, lat, lng, title) {
    var markers = this.get('markers');
    var marker = markers[id];

    if(marker) {
      marker.setLatLng(L.latLng(lat, lng));
    } else {
      marker = L.marker([lat, lng], {
          icon: L.mapbox.marker.icon({
            'marker-color': '#f86767',
            'marker-size': 'small',
          })
      }).bindPopup(title);

      marker.addTo(this.get('map'));
    }

    markers[id] = marker;
    this.set('markers', markers);
    return marker;
  },

  getMarker: function(id) {
    return this.get('markers')[id];
  },

});

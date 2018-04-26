const GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = 'AIzaSyBIr123vN7tyw5Xk-9cQbKOc-wMq5XRMQE';

module.exports = class Map {
	constructor(el) {
		this.el = el;
		this.marker = null;
		this.coords = {
			lat: this.el.getAttribute('data-lat'),
			lng: this.el.getAttribute('data-lng')
		};

		GoogleMapsLoader.load(google => {
			this.google = google;

			this.setupMap();
			this.buildMarkers();
		});
	}

	setupMap() {
		this.map = new this.google.maps.Map(this.el, {
			zoom: 12
		});
	}

	buildMarkers() {
		const position = new this.google.maps.LatLng(this.coords.lat, this.coords.lng);

		this.marker = new this.google.maps.Marker({
			position,
			map: this.map
		});

		this.map.setCenter(position);
	}
};

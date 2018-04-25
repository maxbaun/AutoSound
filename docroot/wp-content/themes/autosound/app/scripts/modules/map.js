module.exports = class Map {
	constructor(el) {
		this.el = el;
		this.marker = null;
		this.coords = {
			lat: this.el.getAttribute('data-lat'),
			lng: this.el.getAttribute('data-lng')
		};

		this.map = new google.maps.Map(this.el, {
			zoom: 12
		});

		this.buildMarkers();
	}

	buildMarkers() {
		const position = new google.maps.LatLng(this.coords.lat, this.coords.lng);

		this.marker = new google.maps.Marker({
			position,
			map: this.map
		});

		this.map.setCenter(position);
	}
};

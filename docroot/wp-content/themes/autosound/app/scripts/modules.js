const modules = {
	hamburger: require('./modules/hamburger'),
	headerSearch: require('./modules/headerSearch'),
	headerDropdown: require('./modules/headerDropdown'),
	modalToggle: require('./modules/modalToggle'),
	modal: require('./modules/modal'),
	navDropdown: require('./modules/navDropdown'),
	carousel: require('./modules/carousel'),
	map: require('./modules/map'),
	imageSlider: require('./modules/imageSlider'),
	gallery: require('./modules/gallery'),
	back: require('./modules/back'),
	shop: require('./react/shop'),
	pagination: require('./react/pagination'),
	storeSelector: require('./react/storeSelector'),
	form: require('./react/form')
};

module.exports = {
	init: () => {
		const dataModules = document.querySelectorAll('[data-module]');
		for (const dataModule of dataModules) {
			const name = dataModule.dataset.module;
			try {
				new modules[name](dataModule); // eslint-disable-line no-new
			} catch (e) {
				console.error(`Error initializing module ${name}`);
				console.error(e);
			}
		}
	}
};

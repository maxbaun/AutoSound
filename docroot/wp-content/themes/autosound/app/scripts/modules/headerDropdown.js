const $ = require('jquery');

module.exports = class HeaderDropdown {
	constructor(el) {
		this.el = el;

		this.setSize();
		$(window).on('resize', this.setSize.bind(this));
	}

	setSize() {
		const windowWidth = $(window).width();

		$(this.el).css('max-width', windowWidth);
	}
};

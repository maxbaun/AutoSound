const $ = require('jquery');

module.exports = class NavDropdown {
	constructor(el) {
		this.el = el;

		this.setRight();
		$(window).on('resize', this.setRight.bind(this));
	}

	setRight() {
		const windowWidth = $(window).width();
		const elWidth = $(this.el).width();
		const elLeft = $(this.el).offset().left;
		const right = elLeft + elWidth;

		if (right > windowWidth) {
			$(this.el)
				.css('right', 15)
				.css('left', 'auto');
		} else {
			$(this.el)
				.css('right', 0)
				.css('left', -15);
		}
	}
};

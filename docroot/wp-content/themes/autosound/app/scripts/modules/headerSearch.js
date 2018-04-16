const $ = require('jquery');

module.exports = class HeaderSearch {
	constructor(el) {
		this.el = el;
		this.toggle = $(el).find('[data-toggle]');
		this.input = $(el).find('[data-search]');
		this.transitionDuration = 300;

		$(this.toggle).click(this.handleClick.bind(this));
	}

	handleClick() {
		if (this.isActive()) {
			return this.open();
		}

		return this.close();
	}

	isActive() {
		return $(this.el).hasClass('active');
	}

	open() {
		$(this.el).removeClass('active');

		setTimeout(() => {
			$(this.input).val('');
		}, this.transitionDuration);
	}

	close() {
		$(this.el).addClass('active');

		setTimeout(() => {
			$(this.input).focus();
		}, this.transitionDuration);
	}
};

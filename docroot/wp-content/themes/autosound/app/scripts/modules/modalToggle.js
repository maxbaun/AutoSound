const $ = require('jquery');

module.exports = class ModalToggle {
	constructor(el) {
		this.el = el;
		const modalSelector = $(el).attr('data-modal');
		this.modal = $(`#${modalSelector}`);

		if (this.modal.length > 0) {
			$(this.el).click(this.handleClick.bind(this));
		}
	}

	handleClick() {
		if (this.isActive()) {
			return this.close();
		}

		return this.open();
	}

	isActive() {
		return $(this.modal).hasClass('active');
	}

	open() {
		$(this.modal).trigger('open');
	}

	close() {
		$(this.modal).trigger('close');
	}
};

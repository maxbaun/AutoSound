const $ = require('jquery');

module.exports = class Modal {
	constructor(el) {
		this.el = el;
		this.close = $(el).find('[data-close]');
		this.align = $(el).attr('data-align');
		this.inner = $(el).find('.modal__inner');

		$(this.el).on('open', this.handleOpen.bind(this));
		$(this.el).on('close', this.handleClose.bind(this));
		$(this.close).click(this.handleClose.bind(this));
	}

	handleOpen() {
		$('body').addClass('modal-open');
		this.positionModal();
		$(this.el).addClass('active');
		$(this.el).fadeIn();
	}

	positionModal() {
		let top = 0;
		let bottom = 0;
		const windowHeight = $(window).height();
		const height = $(this.inner).height();

		switch (this.align) {
			case 'center':
				top = (windowHeight - height) / 2;
				bottom = (windowHeight - height) / 2;
				break;
			default:
				top = 50;
				bottom = 50;
		}

		$(this.inner).css('margin-top', top);
		$(this.inner).css('margin-bottom', bottom);
	}

	handleClose() {
		$('body').removeClass('modal-open');
		$(this.el).removeClass('active');
		$(this.el).fadeOut();
	}
};

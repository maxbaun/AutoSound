const $ = require('jquery');

module.exports = class Hamburger {
	constructor($el) {
		this.$el = $el;
		this.nav = '.header-nav__navigation';
		this.clickFunction(this.$el);
		let tablet = 768;

		$(window).on('resize', () => {
			if ($(window).width() >= tablet) {
				this.resetNav(this.nav, this.$el);
			}
		});
	}

	// Click function method for hamburger
	clickFunction($element) {
		$($element).on('click', e => {
			e.preventDefault();
			if ($($element).attr('aria-expanded') === 'true') {
				$($element).attr('aria-expanded', 'false');
				this.closeNav(this.nav);
			} else {
				$($element).attr('aria-expanded', 'true');
				this.openNav(this.nav);
			}
		});
	}

	// Open navigation method
	openNav($element) {
		const headerHeight = $('header.global-header').height();
		const windowHeight = $(window).height();
		const offset = 20;

		$($element)
			.css('max-height', windowHeight - headerHeight - offset)
			.css('overflow', 'auto');
		$($element).slideDown();
	}

	// Close navigation method
	closeNav($element) {
		$($element).slideUp();
	}

	// Resize function resets active class on hamburger
	// and remove any styles from mobile nav
	resetNav($element, link) {
		$($element).attr('style', '');
		$(link).attr('aria-expanded', 'false');
	}
};

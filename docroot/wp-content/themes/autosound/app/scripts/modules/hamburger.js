import {bind} from 'lodash-decorators';

module.exports = class Hamburger {
	constructor(el) {
		this.el = el;
		this.nav = document.querySelector('.header-nav__navigation');
		this.clickFunction(this.el);
		let tablet = 768;

		window.addEventListener('resize', () => {
			if (window.innerWidth >= tablet) {
				this.resetNav(this.nav, this.el);
			}
		});
	}

	// Click function method for hamburger
	@bind()
	clickFunction(element) {
		element.addEventListener('click', e => {
			e.preventDefault();
			if (element.getAttribute('aria-expanded') === 'true') {
				element.setAttribute('aria-expanded', 'false');
				this.closeNav();
			} else {
				element.setAttribute('aria-expanded', 'true');
				this.openNav(this.nav);
			}
		});
	}

	// Open navigation method
	openNav() {
		const globalHeader = document.querySelector('header.global-header');
		const headerHeight = globalHeader.clientHeight;
		const windowHeight = window.innerHeight;
		const offset = 20;

		this.nav.classList.add('active');
		this.nav.style.maxHeight = `${windowHeight - headerHeight - offset}px`;
		this.nav.style.overflow = 'auto';
	}

	// Close navigation method
	closeNav() {
		this.nav.classList.remove('active');
		delete this.nav.style;
		this.el.setAttritube('aria-expanded', false);
	}

	// Resize function resets active class on hamburger
	// and remove any styles from mobile nav
	resetNav() {
		delete this.nav.style;
		this.el.setAttritube('aria-expanded', false);
	}
};

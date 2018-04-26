module.exports = class Hamburger {
	constructor(el) {
		this.el = el;
		this.nav = document.querySelector('.header-nav__navigation');
		let tablet = 768;

		window.addEventListener('resize', () => {
			if (window.innerWidth >= tablet) {
				this.resetNav(this.nav, this.el);
			}
		});

		this.el.addEventListener('click', ::this.handleClick);
	}

	handleClick(e) {
		e.preventDefault();
		if (this.el.getAttribute('aria-expanded') === 'true') {
			this.el.setAttribute('aria-expanded', 'false');
			this.closeNav();
		} else {
			this.el.setAttribute('aria-expanded', 'true');
			this.openNav();
		}
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
		this.el.setAttribute('aria-expanded', false);
	}

	// Resize function resets active class on hamburger
	// and remove any styles from mobile nav
	resetNav() {
		delete this.nav.style;
		this.el.setAttribute('aria-expanded', false);
	}
};

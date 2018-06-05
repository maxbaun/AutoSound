module.exports = class HeaderSearch {
	constructor(el) {
		this.el = el;
		this.toggle = this.el.querySelector('[data-toggle]');
		this.input = this.el.querySelector('[data-search]');
		this.transitionDuration = 300;

		this.toggle.addEventListener('click', this.handleClick.bind(this));
	}

	handleClick(e) {
		e.preventDefault();

		if (this.isActive()) {
			return this.close();
		}

		return this.open();
	}

	isActive() {
		return this.el.classList.contains('active');
	}

	close() {
		this.el.classList.remove('active');

		setTimeout(() => {
			this.input.value = '';
		}, this.transitionDuration);
	}

	open() {
		this.el.classList.add('active');

		setTimeout(() => {
			this.input.focus();
		}, this.transitionDuration);
	}
};

module.exports = class NavDropdown {
	constructor(el) {
		this.el = el;

		this.setRight();
		window.addEventListener('resize', this.setRight.bind(this));
	}

	setRight() {
		const windowWidth = window.innerWidth;
		const elWidth = this.el.clientWidth;
		const elLeft = this.el.offsetLeft;
		const right = elLeft + elWidth;

		if (right > windowWidth) {
			this.el.style.right = '15px';
			this.el.style.left = 'auto';
		} else {
			this.el.style.right = 0;
			this.el.style.left = '-15px';
		}
	}
};

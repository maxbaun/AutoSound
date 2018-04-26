module.exports = class HeaderDropdown {
	constructor(el) {
		this.el = el;

		this.setSize();
		window.addEventListener('resize', ::this.setSize);
	}

	setSize() {
		this.el.style.maxWidth = `${window.innerWidth}px`;
	}
};

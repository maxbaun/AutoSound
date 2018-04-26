module.exports = class Back {
	constructor(el) {
		this.el = el;

		this.el.addEventListener('click', ::this.handleClick);
	}

	handleClick(e) {
		e.preventDefault();

		if (!window.history) {
			window.location = '/';
			return;
		}

		window.history.back();
	}
};

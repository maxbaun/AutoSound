import {bind} from 'lodash-decorators';

module.exports = class Back {
	constructor(el) {
		this.el = el;

		this.el.addEventListener('click', this.handleClick);
	}

	@bind()
	handleClick(e) {
		e.preventDefault();

		if (!window.history) {
			window.location = '/';
			return;
		}

		window.history.back();
	}
};

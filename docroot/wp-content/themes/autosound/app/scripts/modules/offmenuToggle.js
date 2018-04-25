import {bind} from 'lodash-decorators';

module.exports = class OffmenuToggle {
	constructor(el) {
		this.el = el;
		this.target = this.el.getAttribute('data-target');

		this.offmenu = document.querySelector(this.target);
		this.offmenuWrap = this.offmenu.querySelector('.offmenu__wrap');
		this.offmenuFog = this.offmenu.querySelector('.offmenu__fog');
		this.offmenuClose = this.offmenu.querySelector('.offmenu__close');

		this.el.addEventListener('click', this.handleOffmenuOpen);
		this.offmenuFog.addEventListener('click', this.handleOffmenuClose);
		this.offmenuClose.addEventListener('click', this.handleOffmenuClose);
	}

	@bind()
	handleOffmenuOpen() {
		this.offmenuWrap.classList.add('active');
		this.offmenuFog.classList.add('active');
	}

	@bind()
	handleOffmenuClose() {
		this.offmenuWrap.classList.remove('active');
		this.offmenuFog.classList.remove('active');
	}
};

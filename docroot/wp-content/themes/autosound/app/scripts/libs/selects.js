import $ from 'jquery';

export default class Select {
	constructor(el) {
		this.el = el;
		this.setupHtml();
	}

	setupHtml() {
		const checkbox = $(this.el).clone();

		const wrapper = $('<span class="select"><span class="icon"></span></span>')
			.append(checkbox);

		$(this.el).replaceWith(wrapper);
		this.el = checkbox;
		this.parent = $(checkbox).parents('.select').first();

		$(this.parent).on('click', this.handleChange.bind(this));
	}

	handleChange() {

	}
}

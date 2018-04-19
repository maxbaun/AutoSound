import $ from 'jquery';

export default class Select {
	constructor(el) {
		this.el = el;
		this.setupHtml();
	}

	setupHtml() {
		if ($(this.el).parents('.select').length > 0 || $(this.el).attr('data-skip')) {
			return;
		}

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

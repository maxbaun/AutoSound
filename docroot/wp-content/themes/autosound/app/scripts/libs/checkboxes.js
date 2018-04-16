import $ from 'jquery';

export default class Checkbox {
	constructor(el) {
		this.el = el;
		this.setupHtml();
	}

	setupHtml() {
		const label = $(this.el).siblings('label').first();
		const checkbox = $(this.el).clone();

		const wrapper = $('<span class="checkbox"><span class="box"></span></span>')
			.append(checkbox)
			.append(label.clone());

		$(label).remove();

		$(this.el).replaceWith(wrapper);
		this.el = checkbox;
		this.parent = $(checkbox).parents('.checkbox').first();

		$(this.parent).on('click', this.handleChange.bind(this));

		if (this.isChecked()) {
			this.addChecked();
		}
	}

	handleChange() {
		if (this.isChecked()) {
			return this.removeChecked();
		}

		return this.addChecked();
	}

	addChecked() {
		$(this.el).attr('checked', '');
		$(this.parent).addClass('checked');
	}

	removeChecked() {
		$(this.el).removeAttr('checked');
		$(this.parent).removeClass('checked');
	}

	isChecked() {
		return Boolean($(this.el).is(':checked'));
	}
}

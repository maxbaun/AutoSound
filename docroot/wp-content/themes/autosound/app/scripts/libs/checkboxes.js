import $ from 'jquery';

const WrapperHtml = '<span class="checkbox"><span class="box"></span></span>';

export default class Checkbox {
	constructor(el) {
		this.el = el;
		this.setupHtml();
	}

	setupHtml() {
		if (this.el.parentNode.classList.contains('checkbox') || this.el.getAttribute('data-skip')) {
			return;
		}

		let label = $(this.el).siblings('label').first();
		const checkbox = $(this.el).clone();
		const parent = $(this.el).parent();
		let $target = $(this.el);
		const isLabel = $(parent).is('label');

		if (isLabel) {
			label = $(`<label>${parent.text()}</label>`);
			$target = parent;
		}

		const wrapper = $(WrapperHtml)
			.append(checkbox)
			.append(label.clone());

		if (!isLabel) {
			$(label).remove();
		}

		$target.replaceWith(wrapper);
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

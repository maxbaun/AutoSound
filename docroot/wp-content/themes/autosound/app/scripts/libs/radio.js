import $ from 'jquery';

export default class RadioGroup {
	constructor(data) {
		const inputs = data.inputs;
		this.inputs = null;

		if (inputs && inputs.length) {
			this.setupInputs(inputs);
		}
	}

	setupInputs(inputs) {
		this.inputs = inputs.map(input => {
			const label = $(input).parents('label').first();
			const elem = $(input).clone();

			const wrapper = $('<span class="radio"><span class="box"></span></span>')
				.append(elem)
				.append(label.clone());

			$(label).replaceWith(wrapper);

			return $(elem).parents('.radio').first();
		});

		$(this.inputs).each((index, elem) => {
			const input = $(elem).find('input');

			if (input.attr('checked')) {
				this.checkInput(elem);
			}

			$(elem).on('click', this.handleParentClick.bind(this));
		});
	}

	handleParentClick(e) {
		e.preventDefault();
		const elem = e.target;

		this.checkInput(elem);
	}

	checkInput(elem) {
		$.each(this.inputs, (index, input) => {
			const i = $(input).find('input');

			if ($(input) !== $(elem)) {
				$(input).removeClass('checked');
				$(i).removeAttr('checked');
			}
		});

		$(elem).addClass('checked');
		$(elem).find('input').attr('checked', true);
	}
}

// Startup point for client side application
import React from 'react';
import {render} from 'react-dom';
import {fromJS} from 'immutable';
import {bind} from 'lodash-decorators';

import Form from './components/form';
import mailer from './services/mailer';

module.exports = class FormModule {
	constructor(el) {
		const rawInitialData = el.getAttribute('data-initial-data');
		el.removeAttribute('data-initial-data');

		const initialData = JSON.parse(rawInitialData);

		this.action = initialData.action;

		render(
			<Form
				groups={fromJS(initialData.groups)}
				rows={fromJS(initialData.rows)}
				successMessage={initialData.successMessage}
				errorMessage={initialData.errorMessage}
				onSubmit={this.handleSubmit}
			/>
			,
			el
		);
	}

	@bind()
	async handleSubmit(data) {
		return mailer({
			route: this.action,
			method: 'post',
			data
		});
	}
};

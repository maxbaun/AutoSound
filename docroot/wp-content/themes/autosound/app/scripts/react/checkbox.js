// Startup point for client side application
import React from 'react';
import {render} from 'react-dom';

import Checkbox from './components/checkbox';

module.exports = class CheckboxModule {
	constructor(el) {
		const rawInitialData = el.getAttribute('data-initial-data');
		el.removeAttribute('data-initial-data');

		const initialData = JSON.parse(rawInitialData);

		let parent = el.parentNode;
		let label = '';

		if (parent.tagName === 'LABEL') {
			label = parent.textContent;
			parent = parent.parentNode;
		}

		render(
			<Checkbox
				{...initialData}
				name={el.getAttribute('name')}
				value={el.getAttribute('value')}
				label={label}
			/>
			,
			parent
		);
	}
};

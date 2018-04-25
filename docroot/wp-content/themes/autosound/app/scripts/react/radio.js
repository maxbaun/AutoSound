// Startup point for client side application
import React from 'react';
import {render} from 'react-dom';

import Radio from './components/radio';

module.exports = class RadioModule {
	constructor(el) {
		const rawInitialData = el.getAttribute('data-initial-data');
		el.removeAttribute('data-initial-data');

		const initialData = JSON.parse(rawInitialData);

		let parent = el.parentNode;
		let label = '';

		if (parent.tagName === 'LABEL') {
			label = parent.textContent;
		}

		render(
			<Radio
				{...initialData}
				name={el.getAttribute('name')}
				value={el.getAttribute('value')}
				label={label && label !== '' ? label : el.getAttribute('value')}
			/>
			,
			parent
		);
	}
};

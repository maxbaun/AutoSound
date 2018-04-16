// Startup point for client side application
import React from 'react';
import {render} from 'react-dom';
import {fromJS} from 'immutable';

import Selector from './components/selector';

module.exports = class StoreSelector {
	constructor(el) {
		const rawInitialData = el.getAttribute('data-initial-data');
		el.removeAttribute('data-initial-data');

		const initialData = JSON.parse(rawInitialData);

		const data = fromJS({
			locations: initialData.locations
		});

		render(
			<Selector
				locations={data.get('locations')}
			/>
			,
			el
		);
	}
};

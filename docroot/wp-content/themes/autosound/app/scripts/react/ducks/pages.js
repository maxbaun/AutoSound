import {fromJS} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../utils/duckHelpers';

export const types = {
	...utils.requestTypes('PAGES'),
	PAGES_GET: 'PAGES_GET',
	PAGES_RESPONSE: 'PAGES_RESPONSE',
	PAGES_SET: 'PAGES_SET',
	PAGES_RESET: 'PAGES_REST'
};

export const actions = {
	pagesSet: obj => utils.action(types.PAGES_SET, obj)
};

const initialState = fromJS([]);

export default (state = initialState, action) => {
	switch (action.type) {
		case types.PAGES_SET:
			return fromJS(action.payload);

		case types.PAGES_RESET:
			return initialState;

		default:
			return state;
	}
};

const getPages = state => state.getIn(['app', 'pages']);

export const selectors = {
	getPages: createSelector([getPages], pages => pages)
};

import {fromJS} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../utils/duckHelpers';

export const types = {
	...utils.requestTypes('FILTERS'),
	FILTERS_GET: 'FILTERS_GET',
	FILTERS_RESPONSE: 'FILTERS_RESPONSE',
	FILTERS_SET: 'FILTERS_SET'
};

export const actions = {
	filtersSet: obj => utils.action(types.FILTERS_SET, obj)
};

const initialState = fromJS([]);

export default (state = initialState, action) => {
	switch (action.type) {
		case types.FILTERS_SET:
			return fromJS(action.payload);

		default:
			return state;
	}
};

const getFilters = state => state.getIn(['app', 'filters']);
const getFilter = (state, slug) => {
	return state.getIn(['app', 'filters']).find(f => f.get('slug') === slug);
};

export const selectors = {
	getFilters: createSelector([getFilters], filters => {
		return fromJS({
			categories: filters.map(transformFilter)
		});
	}),
	getFilter: createSelector([getFilter], f => f ? transformFilter(f) : f)
};

function transformFilter(filter) {
	return filter
		.set('meta', filter.get('yoastMeta'))
		.set('title', filter.get('name'))
		.set('link', `/category/${filter.get('slug')}`);
}

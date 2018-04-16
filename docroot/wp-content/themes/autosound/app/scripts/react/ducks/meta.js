import {fromJS} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../utils/duckHelpers';

export const types = {
	PRODUCT_META_SET: 'PRODUCT_META_SET',
	PRODUCT_META_RESET: 'PRODUCT_META_RESET'
};

export const actions = {
	caseMetaSet: payload => utils.action(types.PRODUCT_META_SET, payload)
};

const initialState = utils.initialState({
	product: {}
});

export default (state = initialState, action) => {
	switch (action.type) {
		case types.PRODUCT_META_SET:
			return state.set('product', fromJS(action.payload));

		case types.PRODUCT_META_RESET:
			return state.set('product', initialState.get('product'));

		default:
			return state;
	}
};

const getMeta = state => state.getIn(['app', 'meta']);

export const selectors = {
	getMeta: createSelector([getMeta], m => m),
	getProductMeta: createSelector([getMeta], m => m.get('product'))
};

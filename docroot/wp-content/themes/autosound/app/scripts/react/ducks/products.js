import {fromJS} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../utils/duckHelpers';
import {setImageData} from '../utils/wordpressHelpers';

export const types = {
	...utils.requestTypes('PRODUCTS'),
	PRODUCTS_GET: 'PRODUCTS_GET',
	PRODUCTS_RESPONSE: 'PRODUCTS_RESPONSE',
	PRODUCTS_SET: 'PRODUCTS_SET'
};

export const actions = {
	productsSet: obj => utils.action(types.PRODUCTS_SET, obj)
};

const initialState = fromJS([]);

export default (state = initialState, action) => {
	switch (action.type) {
		case types.PRODUCTS_SET:
			return fromJS(action.payload);

		default:
			return state;
	}
};

const getProducts = state => state.getIn(['app', 'products']);

export const selectors = {
	getProducts: createSelector([getProducts], products => {
		return products.map(product => {
			return product
				.set('id', product.get('id'))
				.set('description', product.getIn(['content', 'rendered']))
				.set('title', product.getIn(['title', 'rendered']))
				.set('price', parseFloat(product.getIn(['acf', 'price'])))
				.set('link', `/product/${product.get('slug')}`)
				.set('features', product.getIn(['acf', 'features']))
				.set('images', product.getIn(['acf', 'images']).map(setImageData));
		});
	})
};

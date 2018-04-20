import {takeEvery, all, put} from 'redux-saga/effects';

import {types as featuredProductTypes} from '../ducks/featuredProducts';

export function * watchFeaturedProducts() {
	yield takeEvery(featuredProductTypes.FEATURED_PRODUCTS_GET, onFeaturedProductsGet);
	yield takeEvery(featuredProductTypes.FEATURED_PRODUCTS_RESPONSE, onFeaturedProductsSet);
}

function * onFeaturedProductsGet({payload}) {
	payload.route = 'product';
	payload.method = 'get';

	if (payload.data.category) {
		payload.data.product_category = payload.data.category; // eslint-disable-line camelcase

		delete payload.data.category;
	}

	return yield payload;
}

function * onFeaturedProductsSet({response}) {
	yield all([
		put({
			type: featuredProductTypes.FEATURED_PRODUCTS_SET,
			payload: response.data
		})
	]);

	return yield response;
}

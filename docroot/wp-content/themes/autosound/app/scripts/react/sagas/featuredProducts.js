import {takeEvery, all, put} from 'redux-saga/effects';

import {types as featuredProductTypes} from '../ducks/featuredProducts';

export function * watchFeaturedProducts() {
	yield takeEvery(featuredProductTypes.FEATURED_PRODUCTS_GET, onFeaturedProductsGet);
	yield takeEvery(featuredProductTypes.FEATURED_PRODUCTS_RESPONSE, onFeaturedProductsSet);
}

function * onFeaturedProductsGet({payload}) {
	payload.route = 'featuredProducts';

	return yield payload;
}

function * onFeaturedProductsSet({response}) {
	yield all([
		put({
			type: featuredProductTypes.FEATURED_PRODUCTS_SET,
			payload: response
		})
	]);

	return yield response;
}

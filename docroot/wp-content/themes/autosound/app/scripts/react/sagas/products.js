import {takeEvery, all, put} from 'redux-saga/effects';

import {types as producttypes} from '../ducks/products';
import {types as metaTypes} from '../ducks/meta';

export function * watchProducts() {
	yield takeEvery(producttypes.PRODUCTS_GET, onProductsGet);
	yield takeEvery(producttypes.PRODUCTS_RESPONSE, onProductsResponse);
}

function * onProductsGet({payload}) {
	payload.route = 'product';
	payload.method = 'get';

	if (payload.data.category) {
		payload.data['filter[taxonomy]'] = 'product_category';
		payload.data['filter[term]'] = payload.data.category;

		delete payload.data.category;
	}

	return yield payload;
}

function * onProductsResponse({response}) {
	yield all([
		put({
			type: metaTypes.PRODUCT_META_SET,
			payload: response.meta
		}),
		put({
			type: producttypes.PRODUCTS_SET,
			payload: response.data
		})
	]);

	return yield response;
}

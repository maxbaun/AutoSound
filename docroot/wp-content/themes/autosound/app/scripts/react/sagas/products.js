import {takeEvery, all, put, select} from 'redux-saga/effects';

import {types as productTypes} from '../ducks/products';
import {types as featuredProductTypes} from '../ducks/featuredProducts';
import {types as metaTypes} from '../ducks/meta';
import {types as stateTypes, selectors as stateSelectors} from '../ducks/state';
import {selectors as filterSelectors} from '../ducks/filters';

export function * watchProducts() {
	yield takeEvery(productTypes.PRODUCTS_GET, onProductsGet);
	yield takeEvery(productTypes.PRODUCTS_RESPONSE, onProductsResponse);
}

function * onProductsGet({payload}) {
	payload.route = 'product';
	payload.method = 'get';

	if (payload.data.category) {
		payload.data['filter[taxonomy]'] = 'product_category';
		payload.data['filter[term]'] = payload.data.category;

		delete payload.data.category;
	}

	if (payload.data.search) {
		payload.data['filter[s]'] = payload.data.search;

		delete payload.data.search;
	}

	if (payload.data.sort === 'priceAsc' || payload.data.sort === 'priceDesc') {
		payload.data['filter[orderby]'] = 'meta_value_num';
		payload.data['filter[meta_key]'] = 'price';
		payload.data.order = payload.data.sort === 'priceAsc' ? 'asc' : 'desc';

		delete payload.data.sort;
	}

	if (payload.data.sort === 'newest') {
		payload.data.orderBy = 'date';
		payload.data.order = 'desc';
	}

	if (payload.data.reset) {
		yield all([
			put({
				type: productTypes.PRODUCTS_RESET
			}),
			put({
				type: featuredProductTypes.FEATURED_PRODUCTS_RESET
			})
		]);

		delete payload.data.reset;
	}

	return yield payload;
}

function * onProductsResponse({response}) {
	const params = yield select(stateSelectors.getParams);

	if (params && params.get('categoryId')) {
		const filter = yield select(filterSelectors.getFilter, params.get('categoryId'));

		if (filter && filter.get('meta')) {
			yield put({
				type: stateTypes.HEAD_SET,
				payload: {
					meta: filter.get('meta').toJS()
				}
			});
		}
	} else if (params && params.get('productId')) {
		yield put({
			type: stateTypes.HEAD_SET,
			payload: {
				meta: response.data[0].yoastMeta
			}
		});
	} else {
		yield put({
			type: stateTypes.HEAD_RESET
		});
	}

	yield all([
		put({
			type: metaTypes.PRODUCT_META_SET,
			payload: response.meta
		}),
		put({
			type: productTypes.PRODUCTS_SET,
			payload: response.data
		})
	]);

	return yield response;
}

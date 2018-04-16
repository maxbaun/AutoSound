import {takeEvery, all, put} from 'redux-saga/effects';

import {types as filterTypes} from '../ducks/filters';

export function * watchFilters() {
	yield takeEvery(filterTypes.FILTERS_GET, onFiltersGet);
	yield takeEvery(filterTypes.FILTERS_RESPONSE, onFiltersResponse);
}

function * onFiltersGet({payload}) {
	payload.route = 'product_category';
	payload.method = 'get';

	return yield payload;
}

function * onFiltersResponse({response}) {
	yield all([
		put({
			type: filterTypes.FILTERS_SET,
			payload: response.data
		})
	]);

	return yield response;
}

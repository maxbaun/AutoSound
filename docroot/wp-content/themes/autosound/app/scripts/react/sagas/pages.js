import {takeEvery, all, put} from 'redux-saga/effects';

import {types as pageTypes} from '../ducks/pages';

export function * watchPages() {
	yield takeEvery(pageTypes.PAGES_GET, onPagesGet);
	yield takeEvery(pageTypes.PAGES_RESPONSE, onPagesResponse);
}

function * onPagesGet({payload}) {
	payload.route = 'pages';
	payload.method = 'get';

	if (payload.data.id) {
		payload.route += `/${payload.data.id}`;
		delete payload.data.id;
	}

	return yield payload;
}

function * onPagesResponse({response}) {
	yield all([
		put({
			type: pageTypes.PAGES_SET,
			payload: response.data
		})
	]);

	return yield response;
}

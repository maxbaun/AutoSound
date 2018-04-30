import {fork, all} from 'redux-saga/effects';

import {watchLocation} from './location';
import {watchApp} from './app';
import {watchData} from './data';
import {watchFilters} from './filters';
import {watchProducts} from './products';
import {watchFeaturedProducts} from './featuredProducts';
import {watchState} from './state';
import {watchPages} from './pages';

export default function * Sagas() {
	yield all([
		fork(watchApp),
		fork(watchLocation),
		fork(watchData),
		fork(watchFilters),
		fork(watchProducts),
		fork(watchFeaturedProducts),
		fork(watchState),
		fork(watchPages)
	]);
}

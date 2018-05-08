import {createSelector} from 'reselect';
import {fromJS} from 'immutable';

import * as utils from '../utils/duckHelpers';
import {selectors as pageSelectors} from './pages';

export const types = {
	OFFMENU_TOGGLE: 'OFFMENU_TOGGLE',
	OFFMENU_SHOW: 'OFFMENU_SHOW',
	OFFMENU_HIDE: 'OFFMENU_HIDE',
	REGISTER_PROMO: 'REGISTER_PROMO',
	OFFMENU_RESET: 'OFFMENU_RESET',
	WINDOW_RESIZE: 'WINDOW_RESIZE',
	PARAM_SET: 'PARAM_SET',
	PARAM_UNSET: 'PARAM_UNSET',
	HEAD_SET: 'HEAD_SET',
	HEAD_RESET: 'HEAD_RESET'
};

export const actions = {
	offmenuToggle: name => utils.action(types.OFFMENU_TOGGLE, {name}),
	offmenuShow: name => utils.action(types.OFFMENU_SHOW, {name}),
	offmenuHide: name => utils.action(types.OFFMENU_HIDE, {name}),
	paramSet: (key, value) => utils.action(types.PARAM_SET, {key, value}),
	paramUnset: key => utils.action(types.PARAM_UNSET, {key}),
	windowResize: payload => utils.action(types.WINDOW_RESIZE, {payload}),
	headSet: payload => utils.action(types.HEAD_SET, {payload})
};

export const initialState = utils.initialState({
	params: {},
	offmenu: {
		shopMenu: false
	},
	windowSize: {
		width: window.innerWidth || document.body.clientWidth,
		height: window.innerHeight || document.body.clientHeight
	},
	head: {
		meta: {}
	}
});

export default (state = initialState, action) => {
	switch (action.type) {
		case types.WINDOW_RESIZE:
			return state.set('windowSize', fromJS({...action.payload}));
		case types.OFFMENU_TOGGLE:
			return state.withMutations(s => {
				let currentState = s.get('offmenu');
				let parts = action.name.split('.');

				s.set('offmenu', initialState.get('offmenu').setIn(parts, !currentState.getIn(parts)));
			});
		case types.OFFMENU_SHOW:
			return state.withMutations(s => {
				let parts = action.name.split('.');

				s.set('offmenu', initialState.get('offmenu').setIn(parts, true));
			});
		case types.OFFMENU_HIDE:
			return state.withMutations(s => {
				let parts = action.name.split('.');

				s.set('offmenu', initialState.get('offmenu').setIn(parts, false));
			});
		case types.OFFMENU_RESET:
			return state.set('offmenu', initialState.get('offmenu'));
		case types.PARAM_SET:
			return state.setIn(['params', action.key], action.value);
		case types.PARAM_UNSET:
			return state.deleteIn(['params', action.key]);
		case types.HEAD_SET:
			return state.set('head', fromJS(action.payload));
		case types.HEAD_RESET:
			return state.set('head', initialState.get('head'));
		default:
			return state;
	}
};

const getState = state => state.get('state');
const getParams = (state, param) => param ? state.getIn(['state', 'params', param]) : state.getIn(['state', 'params']);
const getOffmenu = (state, name) => {
	if (name) {
		const parts = name.split('.');

		return state.getIn(['state', 'offmenu'].concat(parts));
	}

	return state.getIn(['state', 'offmenu']);
};

export const selectors = {
	getState: createSelector([getState, pageSelectors.getPages], (state, pages) => {
		const shopPage = pages.find(p => p.get('id') === parseInt(AutosoundGlobalConstants.shopBaseId, 10));

		return state.updateIn(['head', 'meta'], meta => {
			if (!meta.get('title') && shopPage) {
				meta = meta.set('title', shopPage.getIn(['yoastMeta', 'title']));
			}

			if (!meta.get('description') && shopPage) {
				meta = meta.set('description', shopPage.getIn(['yoastMeta', 'description']));
			}

			if (!meta.get('keywords') && shopPage) {
				meta = meta.set('keywords', shopPage.getIn(['yoastMeta', 'keywords']));
			}

			if (!meta.get('sitename') && shopPage) {
				meta = meta.set('sitename', shopPage.getIn(['yoastMeta', 'sitename']));
			}

			return meta;
		});
	}),
	getParams: createSelector([getParams], params => params),
	getOffmenu: createSelector([getOffmenu], o => o)
};

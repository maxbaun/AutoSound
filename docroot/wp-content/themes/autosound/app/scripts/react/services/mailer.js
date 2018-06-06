import axios from 'axios';

import {apiBase} from '../constants';

const mailer = ({method, route, data, to}) => {
	let request = {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		method,
		data: {
			...data,
			to
		},
		baseURL: apiBase,
		url: parseUrl(route)
	};

	return makeApiCall(request);
};

function parseUrl(route) {
	let url = route;

	return url;
}

async function makeApiCall(request) {
	const data = Object.assign({}, request.data);

	if (data) {
		request.data = JSON.stringify(data);
	}

	return axios(request);
}

export default mailer;

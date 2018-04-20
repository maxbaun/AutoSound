import axios from 'axios';

import {api as apiBase} from '../constants';

const api = ({method, route, data}) => {
	let request = {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		method,
		data,
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

	if (request.method === 'get') {
		request.params = data;
	}

	return axios(request)
		.then(transformResponse(request));
}

function transformResponse(request) {
	return res => {
		const nextPage = request.params.page ? request.params.page + 1 : 2;
		const totalPages = parseInt(res.headers['x-wp-totalpages'], 10);
		const hasMore = nextPage <= totalPages;

		return {
			data: [
				...res.data
			],
			meta: {
				totalPages,
				currentPage: request.params.page ? request.params.page : 1,
				nextPage: nextPage < totalPages ? nextPage : totalPages,
				hasMore
			}
		};
	};
}

export default api;

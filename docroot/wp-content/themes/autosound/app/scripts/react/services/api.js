import axios from 'axios';

import {unique} from '../utils/componentHelpers';
import {api as apiBase} from '../constants';

const api = ({method, route, data}) => {
	if (route === 'filters') {
		return [
			{
				id: unique(),
				title: 'Remote Starters',
				slug: 'remote-starters'
			},
			{
				id: unique(),
				title: 'Alarms',
				slug: 'alarms'
			},
			{
				id: unique(),
				title: 'Bluetooth',
				slug: 'bluetooth'
			},
			{
				id: unique(),
				title: 'Convenience',
				slug: 'convenience'
			},
			{
				id: unique(),
				title: 'Mobile Video',
				slug: 'mobile-video'
			},
			{
				id: unique(),
				title: 'Navigation',
				slug: 'navigation'
			},
			{
				id: unique(),
				title: 'OEM Integration',
				slug: 'oem-integration'
			},
			{
				id: unique(),
				title: 'Safety',
				slug: 'safety'
			},
			{
				id: unique(),
				title: 'Trim',
				slug: 'trim'
			}
		];
	}

	if (route === 'featuredProducts') {
		return [
			{
				id: unique(),
				title: 'Product 1',
				link: '#',
				image: {
					url: '/images/product.jpg',
					alt: 'Product 1'
				},
				price: 20.00,
				buy: {
					link: 'https://google.com'
				}
			},
			{
				id: unique(),
				title: 'Product 2',
				link: '#',
				image: {
					url: '/images/product.jpg',
					alt: 'Product 1'
				},
				price: 20.00,
				buy: {
					link: 'https://google.com'
				}
			},
			{
				id: unique(),
				title: 'Product 3 with a really long name that takes up a lot',
				link: '#',
				image: {
					url: '/images/product.jpg',
					alt: 'Product 1'
				},
				price: 20.00,
				buy: {
					link: 'https://google.com'
				}
			}
		];
	}

	if (route === 'products') {
		return [
			{
				id: unique(),
				title: 'Product 1',
				link: '#',
				image: {
					url: '/images/product.jpg',
					alt: 'Product 1'
				},
				price: 20.00,
				buy: {
					link: 'https://google.com'
				}
			},
			{
				id: unique(),
				title: 'Product 2',
				link: '#',
				image: {
					url: '/images/product.jpg',
					alt: 'Product 1'
				},
				price: 20.00,
				buy: {
					link: 'https://google.com'
				}
			},
			{
				id: unique(),
				title: 'Product 3 with a really long name that takes up a lot',
				link: '#',
				image: {
					url: '/images/product.jpg',
					alt: 'Product 1'
				},
				price: 20.00,
				buy: {
					link: 'https://google.com'
				}
			},
			{
				id: unique(),
				title: 'Product 4',
				link: '#',
				image: {
					url: '/images/product.jpg',
					alt: 'Product 1'
				},
				price: 20.00,
				buy: {
					link: 'https://google.com'
				}
			},
			{
				id: unique(),
				title: 'Product 5',
				link: '#',
				image: {
					url: '/images/product.jpg',
					alt: 'Product 1'
				},
				price: 20.00,
				buy: {
					link: 'https://google.com'
				}
			},
			{
				id: unique(),
				title: 'Product 6',
				link: '#',
				image: {
					url: '/images/product.jpg',
					alt: 'Product 1'
				},
				price: 20.00,
				buy: {
					link: 'https://google.com'
				}
			},
			{
				id: unique(),
				title: 'Product 7',
				link: '#',
				image: {
					url: '/images/product.jpg',
					alt: 'Product 1'
				},
				price: 20.00,
				buy: {
					link: 'https://google.com'
				}
			},
			{
				id: unique(),
				title: 'Product 8',
				link: '#',
				image: {
					url: '/images/product.jpg',
					alt: 'Product 1'
				},
				price: 20.00,
				buy: {
					link: 'https://google.com'
				}
			},
			{
				id: unique(),
				title: 'Product 9',
				link: '#',
				image: {
					url: '/images/product.jpg',
					alt: 'Product 1'
				},
				price: 20.00,
				buy: {
					link: 'https://google.com'
				}
			}
		];
	}

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

import {Map} from 'immutable';

export function currentProduct(slug, products) {
	if (!products) {
		return;
	}

	const product = products.find(p => p.get('slug') === slug);

	if (!product) {
		return Map();
	}

	return product;
}

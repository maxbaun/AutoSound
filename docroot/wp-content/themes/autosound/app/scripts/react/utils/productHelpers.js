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

export function currentCategory(categorySlug, filters) {
	if (!filters) {
		return;
	}

	const categories = filters.get('categories');

	if (!categories) {
		return;
	}

	return categories.find(c => c.get('slug') === categorySlug);
}

export function getCategoryById(categoryId, filters) {
	if (!filters) {
		return;
	}

	const categories = filters.get('categories');

	if (!categories) {
		return;
	}

	return categories.find(c => c.get('id') === categoryId);
}

export function getGiftUpCategory(categorySlug, filters) {
	const category = currentCategory(categorySlug, filters);

	if (!category) {
		return;
	}

	return category.getIn(['acf', 'productCategoryGiftUpId']);
}

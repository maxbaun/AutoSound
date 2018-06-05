import {fromJS, List} from 'immutable';

export function setImageData(image) {
	return fromJS({
		url: image.get('url'),
		alt: image.get('alt'),
		height: image.get('height'),
		width: image.get('width'),
		sizes: {
			thumbnail: {
				url: image.getIn(['sizes', 'thumbnail']),
				width: image.getIn(['sizes', 'thumbnail-width']),
				height: image.getIn(['sizes', 'thumbnail-height'])
			},
			medium: {
				url: image.getIn(['sizes', 'medium']),
				width: image.getIn(['sizes', 'medium-width']),
				height: image.getIn(['sizes', 'medium-height'])
			},
			mediumLarge: {
				url: image.getIn(['sizes', 'medium_large']),
				width: image.getIn(['sizes', 'medium_large-width']),
				height: image.getIn(['sizes', 'medium_large-height'])
			},
			large: {
				url: image.getIn(['sizes', 'large']),
				width: image.getIn(['sizes', 'large-width']),
				height: image.getIn(['sizes', 'large-height'])
			}
		}
	});
}

export function transformProduct(product) {
	return product
		.set('id', product.get('id'))
		.set('meta', product.get('yoastMeta'))
		.set('description', product.getIn(['content', 'rendered']))
		.set('title', product.getIn(['title', 'rendered']))
		.set('price', parseFloat(product.getIn(['acf', 'price'])))
		.set(
			'buy',
			fromJS({
				link: product.getIn(['acf', 'productBuyLink', 'url']),
				text: product.getIn(['acf', 'productBuyLink', 'title'])
			})
		)
		.set('link', `/product/${product.get('slug')}`)
		.set('features', product.getIn(['acf', 'features']))
		.set('images', product.getIn(['acf', 'images']) ? product.getIn(['acf', 'images']).map(setImageData) : List());
}

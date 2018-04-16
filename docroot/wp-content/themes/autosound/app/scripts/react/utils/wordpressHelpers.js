import {fromJS} from 'immutable';

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
};

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List} from 'immutable';
import {bind} from 'lodash-decorators';

import {unique, noop, price} from '../utils/componentHelpers';
import Placeholder from './placeholder';

export default class ShopMenuProducts extends Component {
	constructor(props) {
		super(props);

		this.fetch = unique();
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func),
		featuredProducts: ImmutablePropTypes.list,
		loading: PropTypes.bool
	}

	static defaultProps = {
		actions: {noop},
		featuredProducts: List(),
		loading: true
	}

	render() {
		const {loading} = this.props;

		return (
			<div className="shop-menu__group">
				<h5>Best Sellers</h5>
				<ul className="no-padding">
					{loading ? this.renderDefaultProducts() : this.renderProducts()}
				</ul>
			</div>
		);
	}

	@bind()
	renderDefaultProducts() {
		const defaultProducts = List([unique(), unique(), unique(), unique(), unique(), unique(), unique(), unique()]);

		return defaultProducts.map(c => {
			return (
				<li key={c}>
					<Placeholder
						style={{
							height: 70,
							width: '100%'
						}}
					/>
				</li>
			);
		});
	}

	@bind()
	renderProducts() {
		const {featuredProducts} = this.props;

		return featuredProducts.map(product => {
			return (
				<li key={product.get('id')}>
					<a href={product.get('slug')}>
						<div className="shop-featured-product">
							<div className="shop-featured-product__inner">
								<div className="shop-featured-product__image">
									<img src={product.getIn(['image', 'url'])} alt={product.getIn(['image', 'alt'])}/>
								</div>
								<div className="shop-featured-product__content">
									<p>{product.get('title')}</p>
									<span>{price(product.get('price'))}</span>
								</div>
							</div>
						</div>
					</a>
				</li>
			);
		});
	}
}

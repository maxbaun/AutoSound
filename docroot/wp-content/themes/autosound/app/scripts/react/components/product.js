import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {List, Map} from 'immutable';

import {price, unique, noop, innerHtml, isLoading} from '../utils/componentHelpers';
import {currentProduct} from '../utils/productHelpers';
import ShopGrid from './shopGrid';
import ProductCarousel from './productCarousel';

export default class Product extends Component {
	constructor(props) {
		super(props);

		this.fetch = unique();
		this.relatedFetch = unique();
	}

	static propTypes = {
		match: PropTypes.object.isRequired,
		products: ImmutablePropTypes.list,
		actions: PropTypes.objectOf(PropTypes.func),
		filters: ImmutablePropTypes.map,
		featuredProducts: ImmutablePropTypes.list,
		status: ImmutablePropTypes.map,
		state: ImmutablePropTypes.map
	}

	static defaultProps = {
		products: List(),
		filters: Map(),
		actions: {noop},
		featuredProducts: List(),
		status: Map(),
		state: Map()
	}

	componentDidMount() {
		const product = currentProduct(this.props.match.params.productId, this.props.products);

		if (product.isEmpty()) {
			this.getProduct({});
		} else {
			this.getRelatedProducts(product);
		}
	}

	componentWillReceiveProps(nextProps) {
		const product = currentProduct(nextProps.match.params.productId, nextProps.products);
		const oldProduct = currentProduct(this.props.match.params.productId, this.props.products);

		if (product && !product.equals(oldProduct)) {
			this.getProduct({
				productId: nextProps.match.params.productId
			});
			this.getRelatedProducts(product);
		}
	}

	componentWillUnmount() {
		this.props.actions.paramUnset('productId');
	}

	getProduct({productId = this.props.match.params.productId}) {
		this.props.actions.paramSet('productId', productId);

		this.props.actions.appRequest({
			payload: {
				dataset: 'products',
				action: 'get',
				data: {
					slug: productId
				}
			},
			fetch: this.fetch
		});
	}

	getRelatedProducts(product) {
		if (!product || product.isEmpty()) {
			return;
		}

		const productCategory = product.getIn(['product_category', 0]);

		this.props.actions.appRequest({
			payload: {
				dataset: 'featured_products',
				action: 'get',
				data: {
					exclude: product.get('id'),
					category: productCategory,
					per_page: 3 //eslint-disable-line
				}
			},
			fetch: this.relatedFetch
		});
	}

	render() {
		const {match, products, featuredProducts, state} = this.props;
		const relatedLoading = isLoading(this.relatedFetch, this.props.status);

		const product = currentProduct(match.params.productId, products);

		if (product.isEmpty()) {
			return null;
		}

		return (
			<div className="shop-product-wrap">
				<div className="shop-product">
					<div className="shop-product__inner">
						<div className="shop-product__image">
							<ProductCarousel
								images={product.get('images')}
							/>
						</div>
						<div className="shop-product__content">
							<h3 className="shop-product__title">{product.get('title')}</h3>
							<h4 className="shop-product__price">{price(product.get('price'))}</h4>
							{/* eslint-disable react/no-danger */}
							<div
								dangerouslySetInnerHTML={innerHtml(product.get('description'))}
								className="shop-product__description"
							/>
							{/* eslint-enable react/no-danger */}
							<div className="shop-product__features">
								<ul className="product-features">
									{product.get('features') && product.get('features').map(feature => {
										return (
											<li key={feature.get('text')} className="product-features__feature">
												<i className={`fa ${feature.get('icon')}`}/>
												<span>{feature.get('text')}</span>
											</li>
										);
									})}
								</ul>
							</div>
							<a className="btn btn-primary">Buy Now</a>
						</div>
					</div>
				</div>
				<div className="related-products">
					<h3 className="related-products__title">Related <span className="is-red">Products</span></h3>
					<ShopGrid
						defaultCount={3}
						products={featuredProducts}
						state={state}
						loading={typeof relatedLoading === 'undefined' ? true : relatedLoading}
					/>
				</div>
			</div>
		);
	}
}

import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {List, Map} from 'immutable';

import {price, unique, noop, innerHtml, isLoading} from '../utils/componentHelpers';
import {currentProduct} from '../utils/productHelpers';
import ShopGrid from './shopGrid';
import ProductCarousel from './productCarousel';
import Placeholder from './placeholder';
import NotFound from './404.js';

export default class Product extends Component {
	constructor(props) {
		super(props);

		this.fetch = unique();
		this.relatedFetch = unique();

		this.renderPlaceholder = ::this.renderPlaceholder;
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

		this.props.actions.paramSet('productId', this.props.match.params.productId);

		if (product.isEmpty()) {
			this.getProduct({});
		} else {
			this.getRelatedProducts(product);
		}
	}

	componentWillReceiveProps(nextProps) {
		const product = currentProduct(nextProps.match.params.productId, nextProps.products);
		const oldProduct = currentProduct(this.props.match.params.productId, this.props.products);

		if (this.props.match.params.productId !== nextProps.match.params.productId) {
			this.props.actions.paramSet('productId', nextProps.match.params.productId);
		}

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
		const loading = isLoading(this.fetch, this.props.status);
		const relatedLoading = isLoading(this.relatedFetch, this.props.status);

		const product = currentProduct(match.params.productId, products);

		if (product.isEmpty() && loading) {
			return this.renderPlaceholder();
		}

		if (product.isEmpty()) {
			return (
				<NotFound
					title="Not Found"
					subtitle="The product you are looking for does not exist."
				/>
			);
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
							{product.get('price') ? <h4 className="shop-product__price">{price(product.get('price'))}</h4> : null}
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
							{product.getIn(['buy', 'link']) ? <a href={product.getIn(['buy', 'link'])} className="btn btn-primary">Buy Now</a> : null}
						</div>
					</div>
				</div>
				{featuredProducts && featuredProducts.count() ?
					<div className="related-products">
						<h3 className="related-products__title">Related <span className="is-red">Products</span></h3>
						<ShopGrid
							defaultCount={3}
							products={featuredProducts}
							state={state}
							loading={typeof relatedLoading === 'undefined' ? true : relatedLoading}
						/>
					</div> : null
				}
			</div>
		);
	}

	renderPlaceholder() {
		const featurePlaceholders = List([unique(), unique(), unique(), unique()]);

		return (
			<div className="shop-product-wrap">
				<div className="shop-product placholder">
					<div className="shop-product__inner">
						<div className="shop-product__image">
							<Placeholder
								style={{
									width: '100%',
									height: 256
								}}
							/>
						</div>
						<div className="shop-product__content">
							<h3 className="shop-product__title">
								<Placeholder
									style={{
										width: '100%',
										height: 38
									}}
								/>
							</h3>
							<h4 className="shop-product__price">
								<Placeholder
									style={{
										width: 80,
										height: 23
									}}
								/>
							</h4>
							<div className="shop-product__description">
								<Placeholder
									style={{
										width: '100%',
										height: 50,
										marginBottom: 15
									}}
								/>
							</div>
							<div className="shop-product__features">
								<ul className="product-features">
									{featurePlaceholders.map(feature => {
										return (
											<li key={feature} className="product-features__feature">
												<Placeholder
													style={{
														width: '100%',
														height: 23
													}}
												/>
											</li>
										);
									})}
								</ul>
							</div>
							<Placeholder
								style={{
									width: 187,
									height: 50
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List, Map} from 'immutable';
import {bind} from 'lodash-decorators';

import {unique, noop} from '../utils/componentHelpers';
import Placeholder from './placeholder';
import ShopItem from './shopItem';
import Empty from './empty';

import {isLoading} from '../utils/componentHelpers';

export default class Catalog extends Component {
	constructor(props) {
		super(props);

		this.fetch = unique();
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func),
		products: ImmutablePropTypes.list,
		status: ImmutablePropTypes.map,
		load: PropTypes.bool,
		match: PropTypes.object.isRequired
	}

	static defaultProps = {
		actions: {noop},
		products: List(),
		status: Map(),
		load: true
	}

	componentDidMount() {
		this.getProducts({});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.categoryId !== this.props.match.params.categoryId) {
			this.getProducts({
				categoryId: nextProps.match.params.categoryId
			});
		}
	}

	getProducts({categoryId = this.props.load ? this.props.match.params.categoryId : null}) {
		if (this.props.load === false) {
			return;
		}

		this.props.actions.appRequest({
			payload: {
				dataset: 'products',
				action: 'get',
				data: {
					category: categoryId
				}
			},
			fetch: this.fetch
		});
	}

	render() {
		const loading = isLoading(this.fetch, this.props.status);

		return (
			<div className="shop-catalog">
				<ul className="shop-catalog__grid">
					{loading ? this.renderDefaultProducts() : this.renderProducts()}
				</ul>
			</div>
		);
	}

	@bind()
	renderProducts() {
		const {products, actions} = this.props;

		if (products.isEmpty()) {
			return (
				<Empty
					text="Sorry, no products were found =("
				/>
			);
		}

		return products.map(product => {
			return (
				<li key={product}>
					<ShopItem
						product={product}
						actions={actions}
					/>
				</li>
			);
		});
	}

	@bind()
	renderDefaultProducts() {
		const defaultProducts = List([unique(), unique(), unique(), unique(), unique(), unique(), unique(), unique(), unique(), unique(), unique(), unique()]);

		return defaultProducts.map(product => {
			return (
				<li key={product}>
					<Placeholder
						style={{
							width: '100%',
							height: 370
						}}
					/>
				</li>
			);
		});
	}
}

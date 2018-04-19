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

export default class ShopGrid extends Component {
	constructor(props) {
		super(props);

		this.fetch = unique();
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func),
		products: ImmutablePropTypes.list,
		match: PropTypes.object.isRequired,
		loading: PropTypes.bool,
		defaultCount: PropTypes.number
	}

	static defaultProps = {
		actions: {noop},
		products: List(),
		loading: false,
		defaultCount: 12
	}

	render() {
		const {loading} = this.props;

		return (
			<ul className="shop-grid">
				{loading ? this.renderDefaultProducts() : this.renderProducts()}
			</ul>
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
		const {defaultCount} = this.props;
		let defaultProducts = List();

		for (let i = 0; i < defaultCount; i++) {
			defaultProducts = defaultProducts.push(unique());
		}

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

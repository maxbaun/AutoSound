import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List, Map} from 'immutable';
import {bind} from 'lodash-decorators';

import {unique, noop} from '../utils/componentHelpers';
import {responsive} from '../constants';
import Placeholder from './placeholder';
import ShopItem from './shopItem';
import Empty from './empty';

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
		defaultCount: PropTypes.number,
		state: ImmutablePropTypes.map
	}

	static defaultProps = {
		actions: {noop},
		products: List(),
		loading: false,
		defaultCount: 12,
		state: Map()
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
		const {defaultCount, state} = this.props;
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
							height: state.getIn(['windowSize', 'width']) >= responsive.collapse ? 330 : 502
						}}
					/>
				</li>
			);
		});
	}
}

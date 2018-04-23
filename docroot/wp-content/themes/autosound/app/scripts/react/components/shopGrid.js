import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List, Map} from 'immutable';
import {bind} from 'lodash-decorators';

import {unique, noop, chunkList} from '../utils/componentHelpers';
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

	isMobile() {
		return this.props.state.getIn(['windowSize', 'width']) < responsive.collapse;
	}

	getItemsPerRow() {
		const width = this.props.state.getIn(['windowSize', 'width']);

		if (width > responsive.desktop) {
			return 3;
		}

		if (width > responsive.tablet) {
			return 2;
		}

		return 1;
	}

	render() {
		const {loading} = this.props;

		return (
			<div className="shop-grid">
				{loading ? this.renderDefaultProducts() : this.renderProducts()}
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

		console.log(this.getItemsPerRow());

		const rows = chunkList(products, this.getItemsPerRow());

		return rows.map(row => {
			return (
				<div key={row.getIn([0, 'id'])} className="shop-grid__row">
					{row.map(product => {
						return (
							<div key={product} className="shop-grid__item">
								<ShopItem
									product={product}
									actions={actions}
								/>
							</div>
						);
					})}
				</div>
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

		const rows = chunkList(defaultProducts, this.getItemsPerRow());

		return rows.map(row => {
			return (
				<div key={row.get(0)} className="shop-grid__row">
					{row.map(item => {
						return (
							<div key={item} className="shop-grid__item">
								<Placeholder
									style={{
										width: '100%',
										height: this.isMobile() ? 502 : 330
									}}
								/>
							</div>
						);
					})}
				</div>
			);
		});
	}
}

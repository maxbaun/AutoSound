import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Map, List} from 'immutable';

import {unique, noop} from '../utils/componentHelpers';
import ShopMenuCategories from './shopMenuCategories';
import ShopMenuProducts from './shopMenuProducts';

export default class ShopFilters extends Component {
	constructor(props) {
		super(props);

		this.fetch = unique();
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func),
		filters: ImmutablePropTypes.map,
		loading: PropTypes.bool,
		featuredProducts: ImmutablePropTypes.list
	}

	static defaultProps = {
		actions: {noop},
		filters: Map(),
		loading: true,
		featuredProducts: List()
	}

	componentDidMount() {
		this.getFilters({});
	}

	getFilters() {
		this.props.actions.appRequest({
			payload: {
				dataset: 'filters',
				action: 'get',
				data: {
					per_page: 100 //eslint-disable-line
				}
			},
			fetch: this.fetch
		});
	}

	render() {
		const {actions, filters, loading, featuredProducts} = this.props;

		return (
			<div className="shop-menu">
				<ShopMenuCategories
					actions={actions}
					filters={filters}
					loading={loading}
				/>
				<ShopMenuProducts
					actions={actions}
					featuredProducts={featuredProducts}
					loading={loading}
				/>
			</div>
		);
	}
}

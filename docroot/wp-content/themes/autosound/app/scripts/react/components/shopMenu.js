import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Map, List} from 'immutable';
import {bind} from 'lodash-decorators';

import {unique, noop, state, enter} from '../utils/componentHelpers';
import ShopMenuCategories from './shopMenuCategories';

export default class ShopFilters extends Component {
	constructor(props) {
		super(props);

		this.state = {
			search: ''
		};

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

	@bind()
	handleSubmit() {
		const {search} = this.state;

		if (search && search !== '') {
			this.props.actions.locationPush({
				pathname: `/search/${this.state.search}`
			});
		} else {
			this.props.actions.locationPush({
				pathname: '/'
			});
		}
	}

	@bind()
	handleChange(state) {
		this.setState(state);
	}

	render() {
		const {actions, filters, loading} = this.props;

		return (
			<div className="shop-menu">
				<div className="shop-menu__search">
					<input
						type="text"
						name="search"
						placeholder="Search..."
						onKeyUp={enter(this.handleSubmit)}
						onChange={state(this.handleChange, 'search')}
						value={this.state.search}
					/>
				</div>
				<ShopMenuCategories
					actions={actions}
					filters={filters}
					loading={loading}
				/>
				{/* }
				<ShopMenuProducts
					actions={actions}
					featuredProducts={featuredProducts}
					loading={loading}
				/>
				*/ }
			</div>
		);
	}
}

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Map, List} from 'immutable';

import {unique, noop, state as stateHelper, enter, isLoading} from '../utils/componentHelpers';
import ShopMenuCategories from './shopMenuCategories';

export default class ShopFilters extends Component {
	constructor(props) {
		super(props);

		this.state = {
			search: ''
		};

		this.handleSubmit = ::this.handleSubmit;
		this.handleChange = ::this.handleChange;

		this.fetch = unique();
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func),
		filters: ImmutablePropTypes.map,
		featuredProducts: ImmutablePropTypes.list,
		status: ImmutablePropTypes.map,
		state: ImmutablePropTypes.map
	};

	static defaultProps = {
		actions: {noop},
		filters: Map(),
		featuredProducts: List(),
		status: Map(),
		state: Map()
	};

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

	handleChange(state) {
		this.setState(state);
	}

	render() {
		const {actions, filters, status, state} = this.props;
		const loading = isLoading(this.fetch, status);

		return (
			<div className="shop-menu">
				<div className="shop-menu__search">
					<input
						type="text"
						name="search"
						placeholder="Search..."
						onKeyUp={enter(this.handleSubmit)}
						onChange={stateHelper(this.handleChange, 'search')}
						value={this.state.search}
					/>
				</div>
				<ShopMenuCategories actions={actions} filters={filters} loading={loading} state={state}/>
				{/* }
				<ShopMenuProducts
					actions={actions}
					featuredProducts={featuredProducts}
					loading={loading}
				/>
				*/}
			</div>
		);
	}
}

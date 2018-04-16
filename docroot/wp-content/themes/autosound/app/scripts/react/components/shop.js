import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Map, List} from 'immutable';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {renderRoutes} from 'react-router-config';
import {Switch} from 'react-router-dom';

import {noop, unique, click, isLoading} from '../utils/componentHelpers';
import ShopMenu from './shopMenu';
import Offmenu from './offmenu';

export default class Shop extends Component {
	constructor(props) {
		super(props);

		this.productFetch = unique();
		this.filtersFetch = unique();
		this.featuredProductFetch = unique();
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func),
		data: ImmutablePropTypes.map,
		filters: ImmutablePropTypes.map,
		products: ImmutablePropTypes.list,
		featuredProducts: ImmutablePropTypes.list,
		status: ImmutablePropTypes.map,
		state: ImmutablePropTypes.map,
		location: ImmutablePropTypes.map,
		route: PropTypes.object.isRequired
	};

	static defaultProps = {
		actions: {noop},
		data: Map(),
		products: List(),
		featuredProducts: List(),
		filters: Map(),
		status: Map(),
		state: Map(),
		location: Map()
	};

	componentDidMount() {
		if (window.initModules && typeof window.initModules === 'function') {
			window.initModules();
		}

		this.getFeaturedProducts();
		this.getFilters();
	}

	getFilters() {
		this.props.actions.appRequest({
			payload: {
				dataset: 'filters',
				action: 'get',
				data: {}
			},
			fetch: this.filtersFetch
		});
	}

	getFeaturedProducts() {
		this.props.actions.appRequest({
			payload: {
				dataset: 'featured_products',
				action: 'get',
				data: {}
			},
			fetch: this.featuredProductFetch
		});
	}

	render() {
		const {filters, status, actions, state, featuredProducts, location} = this.props;

		const filtersLoading = isLoading(this.filtersFetch, status);
		const featuredLoading = isLoading(this.featuredProductFetch, status);
		const menuLoading = filtersLoading || featuredLoading;

		const isCatalog = location.get('pathname').indexOf('shop') > -1;

		let props = {...this.props};
		delete props.match;

		return (
			<div className="section section--sm section--shop">
				<div className="section__inner">
					<Offmenu
						active={state.getIn(['offmenu', 'shopMenu'])}
						onToggle={click(actions.offmenuToggle, 'shopMenu')}
						position="left"
					>
						<div className="section--shop__mobile-menu">
							<ShopMenu
								filters={filters}
								loading={menuLoading}
								actions={actions}
								featuredProducts={featuredProducts}
							/>
						</div>
					</Offmenu>
					<div className="wrapper section--shop__wrapper">
						<div className="section--shop__header">
							<div className="section--shop__breadcrumbs">
								<ul>
									<li><a href="">Products</a></li>
									<li><a href="">Category</a></li>
									<li><a href="">Product Name</a></li>
								</ul>
							</div>
							{isCatalog ?
								<div className="section--shop__controls">
									<div className="filters">
										<a className="btn btn-primary btn-sm" onClick={click(actions.offmenuToggle, 'shopMenu')}>Filters</a>
									</div>
									<div className="sort">
										<select>
											<option value="newest">Sort by Newest</option>
											<option value="priceDesc">Sort by Price: low to high</option>
											<option value="priceAsc">Sort by Price: high to low</option>
										</select>
									</div>
								</div> : null
							}
						</div>
						<div className="section--shop__menu">
							<ShopMenu
								filters={filters}
								loading={menuLoading}
								actions={actions}
								featuredProducts={featuredProducts}
							/>
						</div>
						<div className="section--shop__products">
							<Switch location={location.toJS()}>
								{renderRoutes(this.props.route.routes, {...props})}
							</Switch>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

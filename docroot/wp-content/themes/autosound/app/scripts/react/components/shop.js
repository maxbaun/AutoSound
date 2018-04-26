import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Map, List, fromJS} from 'immutable';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {renderRoutes} from 'react-router-config';
import {Switch} from 'react-router-dom';
import {bind} from 'lodash-decorators';

import {noop, unique, click, isLoading} from '../utils/componentHelpers';
import {currentCategory, currentProduct} from '../utils/productHelpers';
import ShopMenu from './shopMenu';
import Offmenu from './offmenu';
import HeroTitle from './heroTitle';

export default class Shop extends Component {
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

	@bind()
	getBreadcrumbs() {
		const categoryId = this.props.state.getIn(['params', 'categoryId']);
		const category = currentCategory(categoryId, this.props.filters);

		const productId = this.props.state.getIn(['params', 'productId']);
		const product = currentProduct(productId, this.props.products);

		let breadcrumbs = fromJS([
			{
				isHome: true
			},
			{
				title: 'Products',
				url: '/'
			}
		]);

		if (categoryId && category) {
			breadcrumbs = breadcrumbs.push(fromJS({
				title: category.get('title'),
				url: category.get('link')
			}));
		}

		if (productId && !product.isEmpty()) {
			breadcrumbs = breadcrumbs.push(fromJS({
				title: product.get('title'),
				url: product.get('link')
			}));
		}

		return breadcrumbs;
	}

	@bind()
	getTitle() {
		const categoryId = this.props.state.getIn(['params', 'categoryId']);
		const category = currentCategory(categoryId, this.props.filters);

		const productId = this.props.state.getIn(['params', 'productId']);
		const product = currentProduct(productId, this.props.products);

		let title = 'Products';

		if (categoryId) {
			title = category ? category.get('title') : '';
		}

		if (productId) {
			title = product && !product.isEmpty() ? product.get('title') : '';
		}

		const parts = title.split(' ');

		if (parts.length > 1 && parts[parts.length - 1]) {
			title = parts.reduce((str, part, index) => {
				if (index === parts.length - 1) {
					str += `<span class="is-red">${part}</span> `;
					return str;
				}

				str += `${part} `;
				return str;
			}, '');

			title = title.slice(0, -1);
		}

		return title;
	}

	render() {
		const {filters, status, actions, state, location} = this.props;

		let props = {...this.props};
		delete props.match;

		return (
			<div className="shop">
				<Offmenu
					active={state.getIn(['offmenu', 'shopMenu'])}
					onToggle={click(actions.offmenuToggle, 'shopMenu')}
					position="left"
				>
					<div className="shop-catalog__mobile-menu">
						<ShopMenu
							filters={filters}
							loading={false}
							actions={actions}
						/>
					</div>
				</Offmenu>
				<HeroTitle
					title={this.getTitle()}
					breadcrumbs={this.getBreadcrumbs()}
				/>
				<div className="wrapper">
					<div className="shop__inner">
						<div className="shop__menu">
							<ShopMenu
								filters={filters}
								actions={actions}
								status={status}
							/>
						</div>
						<div className="shop__products">
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

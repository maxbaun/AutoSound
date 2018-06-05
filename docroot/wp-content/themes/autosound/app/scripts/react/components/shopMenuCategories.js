import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Map, List} from 'immutable';
import {Link} from 'react-router-dom';

import {unique, noop, click} from '../utils/componentHelpers';
import {getGiftUpCategory} from '../utils/productHelpers';
import Placeholder from './placeholder';

export default class ShopMenuCategories extends Component {
	constructor(props) {
		super(props);

		this.state = {
			catDropdown: 0
		};

		this.renderDefaultCategories = ::this.renderDefaultCategories;
		this.renderCategories = ::this.renderCategories;
		this.renderSubcategories = ::this.renderSubcategories;
		this.renderLink = ::this.renderLink;
		this.handleToggleClick = ::this.handleToggleClick;

		this.fetch = unique();
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func),
		filters: ImmutablePropTypes.map,
		loading: PropTypes.bool,
		state: ImmutablePropTypes.map
	};

	static defaultProps = {
		actions: {noop},
		filters: Map(),
		loading: true,
		state: Map()
	};

	handleToggleClick(catDropdown) {
		if (this.state.catDropdown === catDropdown) {
			catDropdown = 0;
		}

		this.setState({catDropdown});
	}

	render() {
		const {loading} = this.props;

		return (
			<div className="shop-menu__group">
				<h5>Categories</h5>
				<ul>{loading ? this.renderDefaultCategories() : this.renderCategories()}</ul>
			</div>
		);
	}

	renderDefaultCategories() {
		const defaultCategories = List([unique(), unique(), unique(), unique(), unique(), unique(), unique(), unique()]);

		return defaultCategories.map(c => {
			return (
				<li key={c}>
					<Placeholder
						style={{
							marginBottom: 5,
							height: 25,
							width: 110
						}}
					/>
				</li>
			);
		});
	}

	renderCategories() {
		const {filters} = this.props;

		if (filters.get('categories').isEmpty()) {
			return null;
		}

		return (
			<Fragment>
				<li>
					<Link to="/">All</Link>
				</li>
				{filters.get('categories').map(c => {
					if (c.get('parent')) {
						return null;
					}

					return (
						<li key={c.get('id')}>
							{this.renderLink(c)}
							{this.renderSubcategories(c.get('id'))}
						</li>
					);
				})}
			</Fragment>
		);
	}

	renderSubcategories(catId) {
		const {filters} = this.props;
		const {catDropdown} = this.state;
		const subCategories = filters.get('categories').filter(c => c.get('parent') === catId);

		if (!subCategories || subCategories.count() === 0) {
			return null;
		}

		const wrapClass = ['shop-menu__dropdown'];

		if (catId === catDropdown) {
			wrapClass.push(['active']);
		}

		return (
			<Fragment>
				<span className="shop-menu__dropdown-toggle">
					<span onClick={click(this.handleToggleClick, catId)} className="fa fa-angle-down"/>
				</span>
				<ul className={wrapClass.join(' ')}>
					{subCategories.map(c => {
						return <li key={c.get('id')}>{this.renderLink(c)}</li>;
					})}
				</ul>
			</Fragment>
		);
	}

	renderLink(category) {
		const {filters, state} = this.props;
		const giftUpId = getGiftUpCategory(state.getIn(['params', 'categoryId']), filters);

		if (giftUpId && giftUpId !== '') {
			return <a href={`/${AutosoundGlobalConstants.shopBase}${category.get('link')}`}>{category.get('title')}</a>;
		}

		return <Link to={category.get('link')}>{category.get('title')}</Link>;
	}
}

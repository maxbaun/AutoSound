import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Map, List} from 'immutable';
import {Link} from 'react-router-dom';

import {unique, noop} from '../utils/componentHelpers';
import Placeholder from './placeholder';

export default class ShopMenuCategories extends Component {
	constructor(props) {
		super(props);

		this.renderDefaultCategories = ::this.renderDefaultCategories;
		this.renderCategories = ::this.renderCategories;

		this.fetch = unique();
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func),
		filters: ImmutablePropTypes.map,
		loading: PropTypes.bool
	}

	static defaultProps = {
		actions: {noop},
		filters: Map(),
		loading: true
	}

	render() {
		const {loading} = this.props;

		return (
			<div className="shop-menu__group">
				<h5>Categories</h5>
				<ul>
					{loading ? this.renderDefaultCategories() : this.renderCategories()}
				</ul>
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
					return (
						<li key={c.get('id')}>
							<Link to={c.get('link')}>{c.get('title')}</Link>
						</li>
					);
				})}
			</Fragment>
		);
	}
}

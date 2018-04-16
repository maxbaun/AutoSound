import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Map, List} from 'immutable';
import {bind} from 'lodash-decorators';
import {Link} from 'react-router-dom';

import {unique, noop} from '../utils/componentHelpers';
import Placeholder from './placeholder';

export default class ShopMenuCategories extends Component {
	constructor(props) {
		super(props);

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

	@bind()
	renderDefaultCategories() {
		const defaultCategories = List([unique(), unique(), unique(), unique(), unique(), unique(), unique(), unique()]);

		return defaultCategories.map(c => {
			return (
				<li key={c}>
					<Placeholder
						style={{
							height: 17,
							width: '100%'
						}}
					/>
				</li>
			);
		});
	}

	@bind()
	renderCategories() {
		const {filters} = this.props;

		return filters.get('categories').map(c => {
			return (
				<li key={c.get('id')}>
					<Link to={c.get('link')}>{c.get('title')}</Link>
				</li>
			);
		});
	}
}

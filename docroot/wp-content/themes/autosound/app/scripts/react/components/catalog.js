import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List, Map, fromJS} from 'immutable';

import {unique, noop, isLoading} from '../utils/componentHelpers';
import {wordpressConstants} from '../constants';
import ShopGrid from './shopGrid';
import Select from './select';
import Pagination from './pagination';

export default class Catalog extends Component {
	constructor(props) {
		super(props);

		this.fetch = unique();

		this.handleSortChange = ::this.handleSortChange;
		this.handlePageClick = ::this.handlePageClick;
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func),
		products: ImmutablePropTypes.list,
		status: ImmutablePropTypes.map,
		match: PropTypes.object.isRequired,
		location: ImmutablePropTypes.map,
		state: ImmutablePropTypes.map,
		meta: ImmutablePropTypes.map
	};

	static defaultProps = {
		actions: {noop},
		products: List(),
		status: Map(),
		location: Map(),
		state: Map(),
		meta: Map()
	};

	componentDidMount() {
		this.getProducts({});
	}

	componentWillReceiveProps(nextProps) {
		if (
			nextProps.match.params.categoryId !==
			this.props.match.params.categoryId
		) {
			this.getProducts({
				categoryId: nextProps.match.params.categoryId,
				reset: true
			});
		}

		if (nextProps.match.params.search !== this.props.match.params.search) {
			this.getProducts({
				search: nextProps.match.params.search
			});
		}

		if (
			nextProps.location.getIn(['query', 'sort']) !==
			this.props.location.getIn(['query', 'sort'])
		) {
			this.getProducts({
				sort: nextProps.location.getIn(['query', 'sort']),
				page: 1
			});
		}

		if (
			nextProps.location.getIn(['query', 'page']) !==
			this.props.location.getIn(['query', 'page'])
		) {
			this.getProducts({
				page: nextProps.location.getIn(['query', 'page'])
			});
		}
	}

	componentWillUnmount() {
		this.props.actions.paramUnset('categoryId');
	}

	getProducts({
		categoryId = this.props.match.params.categoryId,
		search = this.props.match.params.search,
		sort = this.props.location.getIn(['query', 'sort']),
		page = this.props.location.getIn(['query', 'page']),
		reset = false
	}) {
		this.props.actions.paramSet('categoryId', categoryId);

		this.props.actions.appRequest({
			payload: {
				dataset: 'products',
				action: 'get',
				data: {
					category: categoryId,
					search,
					sort: sort ? sort : 'newest',
					page: page ? parseInt(page, 10) : 1,
					reset,
					per_page: wordpressConstants.perPage // eslint-disable-line camelcase
				}
			},
			fetch: this.fetch
		});
	}

	handleSortChange(sort) {
		this.props.actions.locationQuery({
			query: {
				sort
			}
		});
	}

	handlePageClick(page) {
		this.props.actions.locationQuery({
			query: {
				page,
				sort: this.props.location.getIn(['query', 'sort'])
			}
		});
	}

	render() {
		const {products, state, meta} = this.props;
		const loading = isLoading(this.fetch, this.props.status);

		const productMeta = meta.get('product');

		return (
			<div className="shop-catalog">
				<div className="shop-catalog__header">
					<div className="shop-catalog__controls">
						<div className="filters"/>
						<div className="sort">
							<Select
								options={fromJS([
									{
										value: 'newest',
										label: 'Sort by Newest'
									},
									{
										value: 'priceAsc',
										label: 'Sort by Price: low to high'
									},
									{
										value: 'priceDesc',
										label: 'Sort by Price: high to low'
									}
								])}
								value={this.props.location.getIn([
									'query',
									'sort'
								])}
								onChange={this.handleSortChange}
							/>
						</div>
					</div>
				</div>
				<ShopGrid
					renderEmpty
					products={products}
					state={state}
					loading={loading}
				/>
				<div className="shop-catalog__pagination">
					{productMeta && !productMeta.isEmpty() ? (
						<Pagination
							{...productMeta.toJS()}
							onPageClick={this.handlePageClick}
						/>
					) : null}
				</div>
			</div>
		);
	}
}

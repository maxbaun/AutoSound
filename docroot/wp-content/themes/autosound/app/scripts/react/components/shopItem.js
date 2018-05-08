import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Map} from 'immutable';

import {noop, price} from '../utils/componentHelpers';
import {wordpressConstants} from '../constants';

export default class ShopItem extends Component {
	static propTypes = {
		product: ImmutablePropTypes.map,
		actions: PropTypes.objectOf(PropTypes.func)
	}

	static defaultProps = {
		product: Map,
		actions: {noop}
	}

	render() {
		const {product} = this.props;

		const featuredImage = product.getIn(['images', 0, 'url']);

		return (
			<div className="shop-item">
				<div className="shop-item__header">
					<div className="shop-item__image">
						<Link to={product.get('link')}>
							{featuredImage ? <img src={featuredImage}/> : <div className="shop-item__image__placeholder"/>}
						</Link>
					</div>
					<div className="shop-item__overlay">
						<div className="vertical-center-wrap">
							<div className="vertical-center-inner">
								<Link to={product.get('link')} className="btn btn-primary btn-sm">View More</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="shop-item__body">
					<h5 className="shop-item__title"><Link to={product.get('link')}>{product.get('title')}</Link></h5>
					<div className="shop-item__footer">
						<span className="shop-item__price">
							{product.get('price') ? price(product.get('price')) : null}
						</span>
						<span className="shop-item__buy">
							{product.getIn(['buy', 'link']) ?
								<a href={product.getIn(['buy', 'link'])} className="fa fa-shopping-cart"/> :
								<a href={wordpressConstants.customQuotePage} className="fa fa-envelope"/>
							}
						</span>
					</div>
				</div>
			</div>
		);
	}
}

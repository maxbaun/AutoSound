import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Map} from 'immutable';

import {noop, price} from '../utils/componentHelpers';

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

		const showFooter = product.get('price') || product.getIn(['buy', 'link']);

		const compileWrapCss = ['shop-item'];

		if (showFooter) {
			compileWrapCss.push('shop-item--has-footer');
		}

		return (
			<div className={compileWrapCss.join(' ')}>
				<div className="shop-item__header">
					<div className="shop-item__image">
						<Link to={product.get('link')}>
							<img src={product.getIn(['images', 0, 'url'])}/>
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
					{showFooter ?
						<div className="shop-item__footer">
							<span className="shop-item__price">
								{product.get('price') ? price(product.get('price')) : null}
							</span>
							<span className="shop-item__buy">
								{product.getIn(['buy', 'link']) ? <a href={product.getIn(['buy', 'link'])} className="fa fa-shopping-cart"/> : null}
							</span>
						</div> : null
					}
				</div>
			</div>
		);
	}
}

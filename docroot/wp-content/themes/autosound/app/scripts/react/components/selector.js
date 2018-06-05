import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List} from 'immutable';

import {tokenGet, tokenSet} from '../services/token';
import {innerHtml, click, stripTags, phoneLink} from '../utils/componentHelpers';
import {responsive} from '../constants';

export default class Selector extends Component {
	constructor(props) {
		super(props);

		this.setWidth = ::this.setWidth;
		this.renderMobile = ::this.renderMobile;
		this.handleLocationUpdate = ::this.handleLocationUpdate;
		this.handleStoreBlockToggle = ::this.handleStoreBlockToggle;

		this.state = {
			location: this.getSavedLocation(),
			maxWidth: 0,
			windowWidth: window.innerWidth,
			storeActive: false
		};
	}

	static propTypes = {
		locations: ImmutablePropTypes.list
	};

	static defaultProps = {
		locations: List()
	};

	componentDidMount() {
		this.setWidth();

		this.setState({
			location: this.getSavedLocation()
		});

		window.addEventListener('resize', this.setWidth);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.setWidth);
	}

	getSavedLocation() {
		const {locations} = this.props;
		const locationToken = tokenGet('location');

		if (!locationToken) {
			return locations.get(0);
		}

		return locations.find(l => l.get('title') === locationToken.title);
	}

	setWidth() {
		this.setState({
			windowWidth: window.innerWidth,
			maxWidth: window.innerWidth
		});
	}

	handleLocationUpdate(location) {
		tokenSet('location', location.toJS());
		this.setState({
			location
		});
	}

	handleStoreBlockToggle(storeActive) {
		this.setState({storeActive});
	}

	render() {
		const {maxWidth, windowWidth, location: currentLocation, storeActive} = this.state;
		const {locations} = this.props;

		if (windowWidth < responsive.collapse) {
			return this.renderMobile();
		}

		return (
			<div className="header-top__blocks">
				<div
					className={['header-top__block', storeActive ? 'active' : ''].join(' ')}
					onClick={click(this.handleStoreBlockToggle, !storeActive)}
					onMouseEnter={click(this.handleStoreBlockToggle, true)}
					onMouseLeave={click(this.handleStoreBlockToggle, false)}
				>
					<span key="storeBlockIcon" className="icon">
						<i className="fa fa-map-o"/>
					</span>
					<span key="storeBlockContant" className="content">
						<div className="content__body">
							<h3>Your Store</h3>
							{/* eslint-disable react/no-danger */}
							<h5>{stripTags(currentLocation.get('address'))}</h5>
							{/* eslint-enable react/no-danger */}
						</div>
						<div className="content__actions">
							<a href={currentLocation.get('directions')} target="_blank">
								Get Directions
							</a>
						</div>
					</span>
					<div className="dropdown store-dropdown" style={{maxWidth}}>
						<div className="header-top__block__close" onClick={click(this.handleStoreBlockToggle, false)}>
							<span className="fa fa-close"/>
						</div>
						<div className="header-top__stores">
							{locations.map(location => {
								return (
									<div key={location.get('title')} className="header-top__store">
										<div className="store-info" data-theme="light">
											<h3>{location.get('title')}</h3>
											<div className="store-info__block has-icons">
												<span className="icon">
													<i className="fa fa-clock-o"/>
												</span>
												{/* eslint-disable react/no-danger */}
												<span dangerouslySetInnerHTML={innerHtml(location.get('hours'))} className="content"/>
												{/* eslint-enable react/no-danger */}
											</div>
											<div className="store-info__block has-icons">
												<span className="icon">
													<i className="fa fa-map-marker"/>
												</span>
												{/* eslint-disable react/no-danger */}
												<span dangerouslySetInnerHTML={innerHtml(location.get('address'))} className="content"/>
												{/* eslint-enable react/no-danger */}
											</div>
											<div className="store-info__block has-icons">
												<span className="icon">
													<i className="fa fa-phone"/>
												</span>
												{/* eslint-disable react/no-danger */}
												<span dangerouslySetInnerHTML={innerHtml(location.get('phoneDetail'))} className="content"/>
												{/* eslint-enable react/no-danger */}
											</div>
											<div className="store-info__footer">
												<a onClick={click(this.handleLocationUpdate, location)} className="btn btn-primary btn-sm">
													Set As My Store
												</a>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<div className="header-top__block">
					<span className="icon">
						<i className="fa fa-phone"/>
					</span>
					<span className="content">
						<div className="content__body">
							<h3>Phone</h3>
							<h5>{currentLocation.get('phone')}</h5>
						</div>
						<div className="content__actions">
							<a href={phoneLink(currentLocation.get('phone'))}>Call Now</a>
						</div>
					</span>
				</div>
			</div>
		);
	}

	renderMobile() {
		const {locations} = this.props;
		const {location: currentLocation} = this.state;

		const otherLocations = locations.filter(l => l.get('id') !== currentLocation.get('id'));

		return (
			<div className="header-locations-menu__inner">
				<div className="header-locations-menu__store">
					<h5>{currentLocation.get('title')}</h5>
					<div className="store-block">
						<div className="store-block__inner">
							<div className="icon">
								<i className="fa fa-map-o"/>
							</div>
							{/* eslint-disable react/no-danger */}
							<div dangerouslySetInnerHTML={innerHtml(currentLocation.get('address'))} className="content"/>
							{/* eslint-enable react/no-danger */}
						</div>
						<a href={currentLocation.get('directions')} target="_blank" className="btn btn-primary btn-xs">
							Get Directions
						</a>
					</div>
					<div className="store-block phone">
						<div className="store-block__inner">
							<div className="icon">
								<i className="fa fa-phone"/>
							</div>
							{/* eslint-disable react/no-danger */}
							<div dangerouslySetInnerHTML={innerHtml(currentLocation.get('phone'))} className="content"/>
							{/* eslint-enable react/no-danger */}
							<a href={phoneLink(currentLocation.get('phone'))} className="btn btn-primary btn-xs">
								Call Now
							</a>
						</div>
					</div>
				</div>
				<div className="header-locations-menu__other-stores">
					<h5>Other Stores</h5>
					<ul>
						{otherLocations.map(location => {
							return (
								<li key={location.get('id')} className="other-store">
									<h5>{location.get('title')}</h5>
									{/* eslint-disable react/no-danger */}
									<div dangerouslySetInnerHTML={innerHtml(currentLocation.get('address'))} className="address"/>
									{/* eslint-enable react/no-danger */}
									<p className="phone">{currentLocation.get('phone')}</p>
									<a onClick={click(this.handleLocationUpdate, location)} className="btn btn-primary-outline btn-xs">
										Set As My Store
									</a>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		);
	}
}

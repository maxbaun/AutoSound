import React, {Component, Fragment} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List} from 'immutable';
import {bind} from 'lodash-decorators';

import {tokenGet, tokenSet} from '../services/token';
import {innerHtml, click, stripTags, phoneLink} from '../utils/componentHelpers';
import {responsive} from '../constants';

export default class Selector extends Component {
	constructor(props) {
		super(props);

		this.state = {
			location: this.getSavedLocation(),
			maxWidth: 0,
			windowWidth: window.innerWidth
		};
	}

	static propTypes = {
		locations: ImmutablePropTypes.list
	}

	static defaultProps = {
		locations: List()
	}

	componentDidMount() {
		this.setWidth();

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

	@bind()
	setWidth() {
		this.setState({
			windowWidth: window.innerWidth,
			maxWidth: window.innerWidth
		});
	}

	@bind()
	handleLocationUpdate(location) {
		tokenSet('location', location.toJS());
		this.setState({
			location
		});
	}

	render() {
		const {maxWidth, windowWidth} = this.state;

		if (windowWidth < responsive.collapse) {
			return this.renderMobile();
		}

		return (
			<div className="header-top__blocks">
				<div className="header-top__block">
					{this.renderStoreBlock()}
					<div className="dropdown store-dropdown" style={{maxWidth}}>
						{this.renderStoreInfo('light')}
					</div>
				</div>
				{this.renderPhoneBlock()}
			</div>
		);
	}

	@bind()
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
							<div
								dangerouslySetInnerHTML={innerHtml(currentLocation.get('address'))}
								className="content"
							/>
							{/* eslint-enable react/no-danger */}
						</div>
						<a href={currentLocation.get('directions')} target="_blank" className="btn btn-primary btn-xs">Get Directions</a>
					</div>
					<div className="store-block phone">
						<div className="store-block__inner">
							<div className="icon">
								<i className="fa fa-phone"/>
							</div>
							{/* eslint-disable react/no-danger */}
							<div
								dangerouslySetInnerHTML={innerHtml(currentLocation.get('phone'))}
								className="content"
							/>
							{/* eslint-enable react/no-danger */}
							<a href={phoneLink(currentLocation.get('phone'))} className="btn btn-primary btn-xs">Call Now</a>
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
									<div
										dangerouslySetInnerHTML={innerHtml(currentLocation.get('address'))}
										className="address"
									/>
									{/* eslint-enable react/no-danger */}
									<p className="phone">{currentLocation.get('phone')}</p>
									<a
										onClick={click(this.handleLocationUpdate, location)}
										className="btn btn-primary-outline btn-xs"
									>
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

	@bind()
	renderStoreBlock() {
		const {location: currentLocation} = this.state;

		return (
			<Fragment>
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
						<a href={currentLocation.get('directions')} target="_blank">Get Directions</a>
					</div>
				</span>
			</Fragment>
		);
	}

	@bind()
	renderPhoneBlock() {
		const {location: currentLocation} = this.state;

		return (
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
		);
	}

	@bind()
	renderStoreInfo(theme) {
		const {windowWidth} = this.state;
		const {locations} = this.props;
		const isMobile = windowWidth < responsive.collapse;
		const btnClass = isMobile ? 'btn btn-primary btn-xs' : 'btn btn-primary btn-sm';

		return (
			<div className="header-top__stores">
				{locations.map(location => {
					return (
						<div key={location.get('title')} className="header-top__store">
							<div className="store-info" data-theme={theme}>
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
								{isMobile === false ?
									<div className="store-info__block has-icons">
										<span className="icon">
											<i className="fa fa-phone"/>
										</span>
										{/* eslint-disable react/no-danger */}
										<span dangerouslySetInnerHTML={innerHtml(location.get('phoneDetail'))} className="content"/>
										{/* eslint-enable react/no-danger */}
									</div> : null
								}
								<div className="store-info__footer">
									<a
										onClick={click(this.handleLocationUpdate, location)}
										className={btnClass}
									>
										Set As My Store
									</a>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	}

	@bind()
	renderStoreInfoMobile() {
		return (
			<div className="header-locations-menu__store">

			</div>
		)
	}
}

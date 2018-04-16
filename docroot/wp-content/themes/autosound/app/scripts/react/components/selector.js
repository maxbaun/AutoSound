import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List} from 'immutable';
import {bind} from 'lodash-decorators';

import {tokenGet, tokenSet} from '../services/token';
import {innerHtml, click, stripTags, phoneLink} from '../utils/componentHelpers';

export default class Selector extends Component {
	constructor(props) {
		super(props);

		this.state = {
			location: this.getSavedLocation(),
			maxWidth: 0
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
		const {locations} = this.props;
		const {location: currentLocation, maxWidth} = this.state;

		return (
			<div className="header-top__blocks">
				<div className="header-top__block">
					<span className="icon">
						<i className="fa fa-map-o"/>
					</span>
					<span className="content">
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
					<div className="dropdown store-dropdown" style={{maxWidth}}>
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
												<a
													onClick={click(this.handleLocationUpdate, location)}
													className="btn btn-primary btn-sm"
												>
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
}

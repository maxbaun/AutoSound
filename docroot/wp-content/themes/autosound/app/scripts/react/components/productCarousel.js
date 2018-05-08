import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List} from 'immutable';
import Swiper from 'swiper';

import {ref, click} from '../utils/componentHelpers';

export default class ProductCarousel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentIndex: 0
		};

		this.slider = null;
		this.swiper = null;

		this.currentIndex = ::this.currentIndex;
		this.handleSlideChange = ::this.handleSlideChange;
		this.handlePaginationClick = ::this.handlePaginationClick;
	}

	static propTypes = {
		images: ImmutablePropTypes.list
	}

	static defaultProps = {
		images: List()
	}

	componentDidMount() {
		this.updateSlider();
	}

	componentWillUpdate(nextProps) {
		if (!nextProps.images.equals(this.props.images)) {
			this.updateSlider();
		}
	}

	componentWillUnmount() {
		// If the swiper is not defined, just return because there is nothing else to remove event listeners from
		if (!this.swiper) {
			return;
		}

		this.swiper.off('slideChange');

		this.swiper = null;
		this.slider = null;
	}

	updateSlider() {
		// If there is one or less image in the slider, don't init anything
		if (this.props.images && this.props.images.count && this.props.images.count() <= 1) {
			return;
		}

		const container = this.slider.querySelector('.swiper-container');
		const options = {
			centeredSlides: false,
			loop: true,
			direction: 'horizontal',
			slidesPerView: 1
		};

		this.swiper = new Swiper(container, options);

		this.swiper.on('slideChange', this.handleSlideChange);
	}

	currentIndex() {
		if (!this.swiper) {
			return 0;
		}

		return this.swiper.realIndex;
	}

	handleSlideChange() {
		this.setState({
			currentIndex: this.swiper.realIndex
		});
	}

	handlePaginationClick(index) {
		this.swiper.slideTo(index);
	}

	render() {
		const {images} = this.props;
		const {currentIndex} = this.state;

		return (
			<div ref={ref.call(this, 'slider')} className="product-carousel">
				<div className="swiper-container">
					<div className="swiper-wrapper">
						{images.map(image => {
							return (
								<div key={image.get('url')} className="swiper-slide">
									<img src={image.get('url')}/>
								</div>
							);
						})}
					</div>
					{images && images.count() > 1 ?
						<ul className="product-carousel__pagination">
							{images.map((image, index) => {
								return (
									<li key={image.get('url')} className={index === currentIndex ? 'active' : ''} onClick={click(this.handlePaginationClick, index + 1)}>
										<img src={image.get('url')}/>
									</li>
								);
							})}
						</ul> : null
					}
				</div>
			</div>
		);
	}
}

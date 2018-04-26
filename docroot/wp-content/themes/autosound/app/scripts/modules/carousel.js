import Swiper from 'swiper';

module.exports = class Carousel {
	constructor(el) {
		this.el = el;
		this.swiperInstance = null;

		window.addEventListener('DOMContentLoaded', ::this.setup);
	}

	getOptions(onlyDefault = false) {
		const defaultOptions = {
			centeredSlides: false,
			loop: true,
			direction: 'horizontal',
			navigation: {
				nextEl: this.el.querySelector('.swiper-button-next'),
				prevEl: this.el.querySelector('.swiper-button-prev')
			},
			pagination: {
				el: this.el.querySelector('.swiper-pagination'),
				clickable: true
			},
			slidesPerView: 1
		};

		if (onlyDefault) {
			return defaultOptions;
		}

		return defaultOptions;
	}

	setup() {
		const options = this.getOptions(false);
		this.swiperInstance = new Swiper(this.el.querySelector('.swiper-container'), options);
		this.swiperInstance.update();
	}
};

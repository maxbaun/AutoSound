import $ from 'jquery';
import Swiper from 'swiper';

module.exports = class Carousel {
	constructor(el) {
		this.el = el;
		this.swiperInstance = null;

		$(window).on('load', () => {
			this.setup();
		});
	}

	getOptions(onlyDefault = false) {
		const defaultOptions = {
			centeredSlides: false,
			loop: true,
			direction: 'horizontal',
			navigation: {
				nextEl: $(this.el).find('.swiper-button-next'),
				prevEl: $(this.el).find('.swiper-button-prev')
			},
			pagination: {
				el: $(this.el).find('.swiper-pagination'),
				clickable: true
			},
			slidesPerView: 1
		};

		if (onlyDefault) {
			return defaultOptions;
		}

		const userOptions = $(this.el).data('opts') || {};
		return $.extend(defaultOptions, userOptions);
	}

	setup() {
		const options = this.getOptions(false);
		this.swiperInstance = new Swiper($(this.el).find('.swiper-container'), options);
		this.swiperInstance.update();
	}
};

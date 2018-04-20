import Swiper from 'swiper';

module.exports = class ImageSlider {
	constructor(el) {
		this.el = el;
		this.pagination = this.el.querySelector('.image-slider__pagination');
		this.bullets = Array.from(this.pagination.querySelectorAll('li'));
		this.swiper = null;
		this.activeSlide = 0;

		this.setupSlider();
	}

	setupSlider() {
		const container = this.el.querySelector('.swiper-container');
		const options = {
			centeredSlides: false,
			loop: true,
			direction: 'horizontal',
			slidesPerView: 1
		};

		this.swiper = new Swiper(container, options);
		this.swiper.on('slideChange', this.handleSlideChange.bind(this));

		this.bullets.forEach((bullet, index) => {
			bullet.addEventListener('click', this.handlePaginationClick(index).bind(this));
		});
	}

	handlePaginationClick(index) {
		return () => {
			this.swiper.slideTo(index + 1);
		};
	}

	handleSlideChange() {
		this.activeSlide = this.swiper.activeIndex;

		this.bullets.forEach((bullet, index) => {
			if (index + 1 === this.activeSlide) {
				bullet.classList.add('active');
			} else {
				bullet.classList.remove('active');
			}
		});
	}
};

const Isotope = require('isotope-layout');
import {bind} from 'lodash-decorators';
import baguetteBox from 'baguettebox.js';

module.exports = class Gallery {
	constructor(el) {
		this.el = el;

		this.isotope = null;
		this.images = this.el.querySelector('.gallery__images');
		this.filters = Array.from(this.el.querySelectorAll('.gallery__filters li'));
		this.activeFilter = null;

		this.setupGallery();
	}

	setupGallery() {
		this.isotope = new Isotope(this.images, {
			itemSelector: 'a',
			layoutMode: 'masonry'
		});

		baguetteBox.run('.lightbox-gallery');

		this.images.classList.add('active');

		this.filters.forEach(filter => {
			filter.addEventListener('click', this.handleFilterClick(filter.getAttribute('data-filter')));
		});
	}

	@bind()
	handleFilterClick(filter) {
		return () => {
			this.activeFilter = filter;

			this.filters.forEach(filterElem => {
				if (!this.activeFilter && !filterElem.getAttribute('data-filter')) {
					return filterElem.classList.add('active');
				}

				if (filterElem.getAttribute('data-filter') === this.activeFilter) {
					return filterElem.classList.add('active');
				}

				return filterElem.classList.remove('active');
			});

			this.filterItems();
		};
	}

	filterItems() {
		const filter = this.activeFilter ? `.${this.activeFilter}` : null;

		this.isotope.arrange({
			filter
		});
	}
};

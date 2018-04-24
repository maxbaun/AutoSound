// Startup point for client side application
import React from 'react';
import {render} from 'react-dom';
import {bind} from 'lodash-decorators';

import Pagination from './components/pagination';

module.exports = class StoreSelector {
	constructor(el) {
		const rawInitialData = el.getAttribute('data-initial-data');
		el.removeAttribute('data-initial-data');

		const initialData = JSON.parse(rawInitialData);

		this.initialData = initialData;

		const prevPage = this.getPrevPage();
		const nextPage = this.getNextPage();

		console.log(prevPage);
		console.log(initialData.current);
		console.log(nextPage);

		render(
			<Pagination
				currentPage={initialData.current}
				totalPages={initialData.total}
				previousPage={prevPage}
				nextPage={nextPage}
				onPageClick={this.handlePageClick}
			/>
			,
			el
		);
	}

	getPrevPage() {
		const currentPage = parseInt(this.initialData.current, 10);
		const totalPages = this.initialData.total;

		if (currentPage === 1) {
			return totalPages;
		}

		return currentPage - 1;
	}

	getNextPage() {
		const currentPage = parseInt(this.initialData.current, 10);
		const totalPages = this.initialData.total;

		if (currentPage === totalPages) {
			return 1;
		}

		return currentPage + 1;
	}

	@bind()
	handlePageClick(page) {
		const foundPage = this.initialData.pages.find(p => parseInt(p.title, 10) === page);

		window.location = foundPage.link;
	}
};

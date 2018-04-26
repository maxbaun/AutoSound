import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';

import {click, noop} from '../utils/componentHelpers';
import {responsive} from '../constants';

let Limit = 5;
let MobileLimit = 3;

export default class Pagination extends Component {
	constructor(props) {
		super(props);

		this.handleResize = ::this.handleResize;
		this.resize = ::this.resize;
		this.handleForwardPages = ::this.handleForwardPages;
		this.handlePreviousPage = ::this.handlePreviousPage;
		this.handleBackPages = ::this.handleBackPages;
		this.handleNextPage = ::this.handleNextPage;
		this.getTotalPagesList = ::this.getTotalPagesList;
		this.showPage = ::this.showPage;

		this.state = {
			range: {},
			windowWidth: 0
		};
	}

	static propTypes = {
		currentPage: PropTypes.number,
		previousPage: PropTypes.number,
		nextPage: PropTypes.number,
		totalPages: PropTypes.number,
		onPageClick: PropTypes.func
	}

	static defaultProps = {
		currentPage: 0,
		previousPage: 1,
		nextPage: 1,
		totalPages: 1,
		onPageClick: noop
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);

		const windowWidth = this.getWindowWidth();
		Limit = this.calculateLimit(windowWidth);

		let mobile = (Limit === MobileLimit);

		this.setRange({
			init: true,
			mobile
		});
	}

	componentWillReceiveProps(nextProps, nextState) {
		if (nextState.windowWidth !== this.state.windowWidth) {
			this.resize(nextState.windowWidth);
		}
	}

	componentDidUpdate(prevProps) {
		const {currentPage} = prevProps;

		if (currentPage !== this.props.currentPage) {
			this.setRange({
				resize: false,
				init: true,
				mobile: Limit === MobileLimit
			});
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	getWindowWidth() {
		return window.innerWidth || document.body.clientWidth;
	}

	handleResize() {
		this.resize(this.getWindowWidth());
	}

	resize(windowWidth) {
		Limit = this.calculateLimit(windowWidth);

		let mobile = Limit === MobileLimit;

		this.setRange({resize: true, mobile, windowWidth});
	}

	calculateLimit(windowWidth) {
		let tempLimit = 5;

		if (windowWidth && windowWidth <= responsive.tablet) {
			tempLimit = MobileLimit;
		}

		return tempLimit;
	}

	setRange(params) {
		let currentPage = params.currentPage || this.props.currentPage;
		let totalPages = params.totalPages || this.props.totalPages;
		let resize = params.resize;
		let init = params.init;
		let mobile = params.mobile;
		let {range} = this.state;

		if (resize || init) {
			let halfLimit = Math.floor(Limit / 2);
			if (mobile) {
				if (currentPage === totalPages) {
					this.setRangeState({
						min: this.props.currentPage - halfLimit,
						max: this.props.currentPage
					});
				} else {
					this.setRangeState({
						min: this.props.currentPage,
						max: this.props.currentPage + halfLimit
					});
				}
			} else if (currentPage - halfLimit <= 1) {
				/* Beginning case */
				let min = 1;
				this.setRangeState({
					min,
					max: min + Limit - 1
				});
			} else if (currentPage - halfLimit > 1 && currentPage + halfLimit < totalPages) {
				/* Middle case */
				this.setRangeState({
					min: currentPage - halfLimit,
					max: currentPage + halfLimit
				});
			} else if (currentPage + halfLimit >= totalPages) {
				/* End case */
				let max = totalPages;
				this.setRangeState({
					min: max - Limit + 1,
					max
				});
			}
		} else if (currentPage === range.max + 1) {
			/* Next button clicked on max viewable page */
			if (range.max + Limit >= totalPages) {
				/* Edge case */
				let max = totalPages;
				this.setRangeState({
					min: max - Limit + 1,
					max
				});
			} else {
				this.setRangeState({
					min: range.min + Limit,
					max: range.max + Limit
				});
			}
		} else if (currentPage === range.min - 1) {
			/* Previous button clicked on min viewable page */
			if (range.min - Limit <= 1) {
				/* Edge case */
				let min = 1;
				this.setRangeState({
					min,
					max: min + Limit - 1
				});
			} else {
				this.setRangeState({
					min: range.min - Limit,
					max: range.max - Limit
				});
			}
		} else if (!range.max) {
			/* On initialize */
			let min = 1;
			this.setRangeState({
				min,
				max: min + Limit - 1
			});
		}
	}

	setRangeState(range) {
		this.setState({range});
	}

	handleBackPages() {
		let {range} = this.state;

		if (range.min - Limit <= 1) {
			/* Edge case */
			let min = 1;
			this.setRangeState({
				min,
				max: min + Limit - 1
			});
		} else {
			this.setRangeState({
				min: range.min - Limit,
				max: range.max - Limit
			});
		}
	}

	handleForwardPages() {
		let {range} = this.state;
		let {totalPages} = this.props;

		if (range.max + Limit >= totalPages) {
			/* Edge case */
			let max = totalPages;
			this.setRangeState({
				min: max - Limit + 1,
				max
			});
		} else {
			this.setRangeState({
				min: range.min + Limit,
				max: range.max + Limit
			});
		}
	}

	handlePreviousPage() {
		let page = this.props.currentPage;

		if (this.props.currentPage === 1) {
			page = this.props.totalPages;
		} else {
			page = this.props.previousPage;
		}

		if (page) {
			this.props.onPageClick(page);
		}
	}

	handleNextPage() {
		let page = this.props.currentPage;

		if (this.props.currentPage === this.props.totalPages) {
			page = 1;
		} else {
			page = this.props.nextPage;
		}
		this.props.onPageClick(page);
	}

	getTotalPagesList() {
		let list = List();

		for (let i = 1; i <= this.props.totalPages; i++) {
			list = list.push(i);
		}

		return list;
	}

	showPage(page) {
		const {range} = this.state;
		return page >= Number(range.min) && page <= Number(range.max);
	}

	render() {
		const {currentPage} = this.props;
		const totalPages = this.getTotalPagesList();

		return totalPages.count() > 1 && (
			<div className="pagination">
				<p className="pagination__text">Page {currentPage} of {totalPages.count()}</p>
				<ul className="pagination__list">
					<li className="pagination__page" style={{opacity: currentPage === 1 ? 0.25 : 1}}>
						<a className="pagination__previous" onClick={this.handlePreviousPage}>
							<span className="fa fa-chevron-left"/>
						</a>
					</li>
					<li className={this.state.range.min > 1 ? 'pagination__toggle pagination__toggle--active' : 'pagination__toggle'}>
						<a className="pagination__page-link" onClick={this.handleBackPages} >...</a>
					</li>
					{totalPages
						.filter(this.showPage)
						.map(page => {
							return (
								<li key={page} className="pagination__page">
									<a className={currentPage === page ? 'pagination__page-link pagination__page-link--active' : 'pagination__page-link'} onClick={click(this.props.onPageClick, page)}>{page}</a>
								</li>
							);
						})}
					<li className={this.state.range.max < totalPages.count() ? 'pagination__toggle pagination__toggle--active' : 'pagination__toggle'}>
						<a className="pagination__page-link" onClick={this.handleForwardPages}>...</a>
					</li>
					{/* eslint-disable no-negated-condition */}
					<li className="pagination__page" style={{opacity: currentPage !== totalPages.count() ? 1 : 0.25}}>
						{/* eslint-enable no-negated-condition */}
						<a className="pagination__next" onClick={this.handleNextPage}>
							<span className="fa fa-chevron-right"/>
						</a>
					</li>
				</ul>
			</div>
		);
	}
}

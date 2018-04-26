import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {renderRoutes} from 'react-router-config';
import {Map, List} from 'immutable';

import {actions as locationActions, selectors as locationSelectors} from '../ducks/location';
import {actions as storeActions, selectors as storeSelectors} from '../ducks/app';
import {actions as dataActions, selectors as dataSelectors} from '../ducks/data';
import {selectors as filterSelectors} from '../ducks/filters';
import {selectors as productSelectors} from '../ducks/products';
import {selectors as featuredProductSelectors} from '../ducks/featuredProducts';
import {actions as stateActions, selectors as stateSelectors} from '../ducks/state';
import {selectors as metaSelectors} from '../ducks/meta';

import routes from '../routes';

import {unique} from '../utils/componentHelpers';

const mapStateToProps = state => ({
	location: locationSelectors.getLocation(state),
	status: storeSelectors.getStatus(state),
	data: dataSelectors.getData(state),
	filters: filterSelectors.getFilters(state),
	products: productSelectors.getProducts(state),
	featuredProducts: featuredProductSelectors.getFeaturedProducts(state),
	state: stateSelectors.getState(state),
	meta: metaSelectors.getMeta(state)
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
		...locationActions,
		...storeActions,
		...dataActions,
		...stateActions
	}, dispatch)
});

class App extends Component {
	constructor(props) {
		super(props);

		this.fetch = unique();

		this.handleResize = ::this.handleResize();
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func).isRequired,
		data: ImmutablePropTypes.map,
		filters: ImmutablePropTypes.map,
		products: ImmutablePropTypes.list,
		featuredProducts: ImmutablePropTypes.list,
		meta: ImmutablePropTypes.map
	};

	static defaultProps = {
		data: Map(),
		filters: Map(),
		products: List(),
		featuredProducts: List(),
		meta: Map()
	};

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	handleResize() {
		this.props.actions.windowResize({
			width: window.innerWidth || document.body.clientWidth,
			height: window.innerHeight || document.body.clientHeight
		});
	}

	render() {
		let props = {...this.props};
		delete props.match;

		return (
			<div className="react-section">
				{renderRoutes(routes, {...props})}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

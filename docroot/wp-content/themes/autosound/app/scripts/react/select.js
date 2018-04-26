// Startup point for client side application
import React, {Component} from 'react';
import {render} from 'react-dom';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {fromJS, List} from 'immutable';
import {bind} from 'lodash-decorators';

import Select from './components/select';

module.exports = class RadioModule {
	constructor(el) {
		const rawInitialData = el.getAttribute('data-initial-data');
		el.removeAttribute('data-initial-data');

		const initialData = JSON.parse(rawInitialData);

		let parent = el.parentNode;

		const options = fromJS(Array.from(el.querySelectorAll('option'))
			.map(option => {
				return {
					label: option.textContent,
					value: option.getAttribute('value')
				};
			}));

		this.select = render(
			<SelectParent
				{...initialData}
				name={el.getAttribute('name')}
				value={el.getAttribute('value') || options.getIn([0, 'value'])}
				options={options}
			/>
			,
			parent
		);
	}
};

class SelectParent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: props.value || props.options.getIn([0, 'value'])
		};
	}

	static propTypes = {
		name: PropTypes.string.isRequired,
		value: PropTypes.string,
		options: ImmutablePropTypes.list
	}

	static defaultProps = {
		value: '',
		options: List()
	}

	@bind()
	handleChange(value) {
		this.setState({value});
	}

	render() {
		const {options, name} = this.props;

		return (
			<Select
				name={name}
				value={this.state.value}
				options={options}
				onChange={this.handleChange}
			/>
		);
	}
}

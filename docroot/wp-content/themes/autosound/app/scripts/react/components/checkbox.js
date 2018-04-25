import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bind} from 'lodash-decorators';

import {click} from '../utils/componentHelpers';

export default class Checkbox extends Component {
	constructor(props) {
		super(props);

		this.state = {
			checked: props.checked || false
		};
	}

	static propTypes = {
		checked: PropTypes.bool,
		name: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired
	}

	static defaultProps = {
		checked: false
	}

	@bind()
	handleClick(checked) {
		this.setState({
			checked
		});
	}

	render() {
		const {checked} = this.state;
		const {name, value, label} = this.props;

		const classes = ['checkbox'];

		if (checked) {
			classes.push('checked');
		}

		return (
			<span className={classes.join(' ')} onClick={click(this.handleClick, !checked)}>
				<span className="box"/>
				<input
					data-skip
					type="checkbox"
					name={name}
					value={value}
					onChange={click(this.handleClick, !checked)}
					checked={checked}
				/>
				<label>{label}</label>
			</span>
		);
	}
}

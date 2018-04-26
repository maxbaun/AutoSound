import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {ref} from '../utils/componentHelpers';

export default class Radio extends Component {
	constructor(props) {
		super(props);

		this.handleClick = ::this.handleClick;
		this.handleChange = ::this.handleChange;
		this.isChecked = ::this.isChecked;
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

	isChecked() {
		if (!this.el) {
			return false;
		}
		return this.el.checked;
	}

	handleClick() {
		this.el.click();
	}

	handleChange(e) {
		e.preventDefault();
	}

	render() {
		const {name, value, label} = this.props;

		const classes = ['radio normal'];

		if (this.isChecked()) {
			classes.push('checked');
		}

		return (
			<span key={value} className={classes.join(' ')} onClick={this.handleClick}>
				<input
					key="input"
					ref={ref.call(this, 'el')}
					data-skip
					className="normal"
					type="radio"
					name={name}
					value={value}
					onChange={this.handleChange}
				/>
				<label key="label">{label}</label>
			</span>
		);
	}
}

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bind} from 'lodash-decorators';

import {ref} from '../utils/componentHelpers';

export default class Radio extends Component {
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
	isChecked() {
		if (!this.el) {
			return false;
		}
		return this.el.checked;
	}

	@bind()
	handleClick() {
		this.el.click();
	}

	@bind()
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

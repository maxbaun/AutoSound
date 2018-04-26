import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {List} from 'immutable';

import {noop, input, ref} from '../utils/componentHelpers';

export default class Select extends Component {
	constructor(props) {
		super(props);

		this.handleIconClick = ::this.handleIconClick;
	}

	static propTypes = {
		value: PropTypes.string,
		name: PropTypes.string.isRequired,
		options: ImmutablePropTypes.list,
		onChange: PropTypes.func
	}

	static defaultProps = {
		value: '',
		options: List(),
		onChange: noop
	}

	handleIconClick() {
		this.el.click();
	}

	render() {
		const {value, name, options, onChange: handleChange} = this.props;

		return (
			<span className="select">
				<span key="selectIcon" onClick={this.handleIconClick} className="icon"/>
				<select
					key="selectElement"
					ref={ref.call(this, 'el')}
					data-skip
					name={name}
					onChange={input(handleChange)}
					value={value}
				>
					{options.map(o => {
						return (
							<option key={o.get('value')} value={o.get('value')}>{o.get('label')}</option>
						);
					})}
				</select>
			</span>
		);
	}
}

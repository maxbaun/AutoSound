import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {List} from 'immutable';

import {noop, input} from '../utils/componentHelpers';

const Select = ({value, options, onChange: handleChange}) => {
	return (
		<span className="select">
			<span className="icon"/>
			<select data-skip onChange={input(handleChange)} value={value}>
				{options.map(o => {
					return (
						<option key={o.get('value')} value={o.get('value')}>{o.get('label')}</option>
					);
				})}
			</select>
		</span>
	);
};

Select.propTypes = {
	value: PropTypes.string,
	options: ImmutablePropTypes.list,
	onChange: PropTypes.func
};

Select.defaultProps = {
	value: '',
	options: List(),
	onChange: noop
};

export default Select;

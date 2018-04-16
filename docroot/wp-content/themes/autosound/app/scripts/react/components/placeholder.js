import React from 'react';
import PropTypes from 'prop-types';

const Placeholder = ({style, color}) => {
	const innerStyle = {};

	if (color) {
		innerStyle.backgroundColor = color;
	}

	return (
		<div className="loading-placeholder" style={style}>
			<div className="loading-placeholder__inner" style={innerStyle}/>
		</div>
	);
};

Placeholder.propTypes = {
	style: PropTypes.object,
	color: PropTypes.string
};

Placeholder.defaultProps = {
	style: {},
	color: ''
};

export default Placeholder;

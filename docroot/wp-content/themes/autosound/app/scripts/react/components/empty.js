import React from 'react';
import PropTypes from 'prop-types';

const Empty = ({text, children}) => {
	return (
		<div className="shop-empty">
			{text && text !== '' ? <p>{text}</p> : children}
		</div>
	);
};

Empty.propTypes = {
	text: PropTypes.string,
	children: PropTypes.element.isRequired
};

Empty.defaultProps = {
	text: ''
};

export default Empty;

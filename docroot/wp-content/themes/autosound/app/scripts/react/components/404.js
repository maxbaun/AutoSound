import React from 'react';
import PropTypes from 'prop-types';

import {wordpressConstants} from '../constants';

function handleBack() {
	if (!window.history) {
		window.locaiton = '/';
	}

	window.history.back();
}

const NotFound = ({title, subtitle}) => {
	return (
		<div className="not-found">
			<div className="not-found__icon">
				<i className="fa fa-frown-o"/>
			</div>
			<h1>{title}</h1>
			{subtitle && subtitle !== '' ? <h3>{subtitle}</h3> : null}
			<div className="not-found__buttons">
				<a className="btn btn-black has-icon has-icon--left" onClick={handleBack}>
					<i className="fa fa-arrow-left"/>
					<span>Go Back</span>
				</a>
				<a className="btn btn-primary has-icon has-icon--right" href={wordpressConstants.homeUrl}>
					Home
					<i className="fa fa-home"/>
				</a>
			</div>
		</div>
	);
};

NotFound.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string
};

NotFound.defaultProps = {
	subtitle: ''
};

export default NotFound;

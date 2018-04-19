import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List} from 'immutable';
import {Link} from 'react-router-dom';

import {innerHtml} from '../utils/componentHelpers';

const HeroTitle = ({title, breadcrumbs}) => {
	return (
		<div className="hero hero--title">
			<div className="wrapper">
				<div className="hero--title__inner">
					<div className="hero--title__title">
						{/* eslint-disable react/no-danger */}
						<h1 dangerouslySetInnerHTML={innerHtml(title)}/>
						{/* eslint-enable react/no-danger */}
					</div>
					<div className="hero--title__breadcrumbs">
						<div className="breadcrumbs">
							<ul>
								{breadcrumbs.map(bc => {
									return (
										<li key={bc.get('title')}>
											{bc.get('isHome') ?
												<a href="/"><span className="fa fa-home"/></a> :
												<Link to={bc.get('url')}>{bc.get('title')}</Link>
											}
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

HeroTitle.propTypes = {
	title: PropTypes.string.isRequired,
	breadcrumbs: ImmutablePropTypes.list
};

HeroTitle.defaultProps = {
	breadcrumbs: List()
};

export default HeroTitle;

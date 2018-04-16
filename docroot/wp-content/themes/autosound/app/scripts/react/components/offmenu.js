import React from 'react';
import PropTypes from 'prop-types';

const Offmenu = ({children, active, position, onToggle, fog}) => {
	return (
		<div className="offmenu">
			{fog ? <div className={active ? ['offmenu__fog', 'active'].join(' ') : 'offmenu__fog'} onClick={onToggle}/> : null}
			<div className={active ? ['offmenu__wrap', 'active'].join(' ') : 'offmenu__wrap'} data-position={position}>
				<div className="offmenu__inner">
					<span
						className="offmenu__close"
						onClick={onToggle}
					>
						<i className="fa fa-close"/>
					</span>
					{children}
				</div>
			</div>
		</div>
	);
};

Offmenu.propTypes = {
	active: PropTypes.bool.isRequired,
	children: PropTypes.element.isRequired,
	position: PropTypes.string.isRequired,
	onToggle: PropTypes.func.isRequired,
	fog: PropTypes.bool
};

Offmenu.defaultProps = {
	fog: true
};

export default Offmenu;

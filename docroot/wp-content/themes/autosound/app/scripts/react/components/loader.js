import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({height, width, color, viewWidth, viewHeight, margin}) => {
	const x = viewWidth / 4;
	const half = x / 2;
	const y = height / 2;
	const style = {
		width: width / 2,
		height,
		margin
	};

	const transforms = [
		`${x - half} ${y}`,
		`${(x * 2) - half} ${y}`,
		`${(x * 3) - half} ${y}`,
		`${(x * 4) - half} ${y}`
	];

	return (
		<div style={style}>
			<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox={`0 0 ${viewWidth} ${viewHeight}`} preserveAspectRatio="xMidYMid" style={{background: 'none'}}>
				<g transform={`translate(${transforms[0]})`}>
					<circle cx="0" cy="0" r="5" fill={color} transform="scale(0.686929 0.686929)">
						<animateTransform attributeName="transform" type="scale" begin="-0.75s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
					</circle>
				</g>
				<g transform={`translate(${transforms[1]})`}>
					<circle cx="0" cy="0" r="5" fill={color} transform="scale(0.957109 0.957109)">
						<animateTransform attributeName="transform" type="scale" begin="-0.5s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
					</circle>
				</g>
				<g transform={`translate(${transforms[2]})`}>
					<circle cx="0" cy="0" r="5" fill={color} transform="scale(0.945179 0.945179)">
						<animateTransform attributeName="transform" type="scale" begin="-0.25s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
					</circle>
				</g>
				<g transform={`translate(${transforms[3]})`}>
					<circle cx="0" cy="0" r="5" fill={color} transform="scale(0.664296 0.664296)">
						<animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite"/>
					</circle>
				</g>
			</svg>
		</div>
	);
};

Loader.propTypes = {
	height: PropTypes.number,
	width: PropTypes.number,
	viewHeight: PropTypes.number,
	viewWidth: PropTypes.number,
	color: PropTypes.string,
	margin: PropTypes.string
};

Loader.defaultProps = {
	height: 20,
	width: 100,
	viewHeight: 10,
	viewWidth: 50,
	color: '#FFF',
	margin: ''
};

export default Loader;

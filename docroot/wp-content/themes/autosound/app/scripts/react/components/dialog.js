import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TransitionMotion, spring, presets} from 'react-motion';

import {noop, click} from '../utils/componentHelpers';

const MotionStyles = {
	enter: 0,
	leave: -25
};

export default class Dialog extends Component {
	static propTypes = {
		title: PropTypes.string,
		confirmText: PropTypes.string,
		confirmDisabled: PropTypes.bool,
		onDismiss: PropTypes.func,
		onClose: PropTypes.func,
		children: PropTypes.element.isRequired,
		active: PropTypes.array,
		id: PropTypes.string.isRequired,
		showFooter: PropTypes.bool,
		showCancel: PropTypes.bool,
		showDismiss: PropTypes.bool,
		size: PropTypes.string,
		fogDismiss: PropTypes.bool
	}

	static defaultProps = {
		title: '',
		confirmText: 'Confirm',
		confirmDisabled: false,
		onDismiss: noop,
		onClose: noop,
		active: [],
		showFooter: true,
		showCancel: true,
		showDismiss: true,
		size: 'sm',
		fogDismiss: false
	};

	getDefaultStyles() {
		let {active, id} = this.props;

		if (!Array.isArray(active)) {
			active = [active];
		}

		return active.map(i => {
			return {
				key: id,
				style: {
					opacity: 0,
					y: MotionStyles.leave
				},
				data: i
			};
		});
	}

	getStyles() {
		let {active, id} = this.props;

		if (!Array.isArray(active)) {
			active = [active];
		}

		return active.map(i => {
			return {
				key: id,
				style: {
					opacity: spring(1, presets.gentle),
					y: spring(MotionStyles.enter, presets.gentle)
				},
				data: i
			};
		});
	}

	willEnter() {
		return {
			opacity: 0,
			y: MotionStyles.leave
		};
	}

	willLeave() {
		return {
			opacity: spring(0, presets.gentle),
			y: spring(MotionStyles.leave, presets.gentle)
		};
	}

	render() {
		const {title, confirmText, confirmDisabled, onClose, onDismiss, children, active, showFooter, size, fogDismiss, showCancel, showDismiss} = this.props;
		const fogClass = active[0] ? 'dialog__fog--active' : 'dialog__fot';
		const bodyClass = ['dialog__body'];

		if (title && title !== '') {
			bodyClass.push('has-header');
		}

		if (showFooter) {
			bodyClass.push('has-footer');
		}

		return (
			<div className="dialog">
				{fogDismiss ?
					<div className={fogClass} onClick={click(onDismiss)}/> :
					<div className={fogClass}/>
				}
				<TransitionMotion
					defaultStyles={this.getDefaultStyles()}
					styles={this.getStyles()}
					willEnter={this.willEnter}
					willLeave={this.willLeave}
				>
					{styles => {
						return (
							<div>
								{styles.map(({style, key}) => {
									const dialogStyle = {
										opacity: style.opacity,
										marginTop: `${style.y}px`
									};

									return (
										<div key={key} className={`dialog--${size}`} style={dialogStyle}>
											<div className="dialog__inner">
												{showDismiss ?
													<div className="dialog__close">
														<a
															onClick={click(onDismiss)}
															className="fa fa-close"
														/>
													</div> : null
												}
												{title && title !== '' ?
													<div className="dialog__header">
														<h1 className="dialog__title">{title}</h1>
													</div> : null
												}
												<div className={bodyClass.join(' ')}>
													{children}
												</div>
												{showFooter ?
													<div className="dialog__footer">
														{confirmText ?
															<a
																className="btn btn-black btn-xs"
																disabled={confirmDisabled ? 'disabled' : ''}
																onClick={onClose}
															>
																{confirmText}
															</a> : null
														}
														{showCancel ?
															<a
																className="btn btn-primary btn-xs"
																onClick={click(onDismiss)}
															>
																Cancel
															</a> : null
														}
													</div> : null
												}
											</div>
										</div>
									);
								})}
							</div>
						);
					}}
				</TransitionMotion>
			</div>
		);
	}
}

import React, {Component, Fragment} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {List, fromJS} from 'immutable';
import {bind} from 'lodash-decorators';

import {enter, state, click, clickPrevent, noop, ScrollTo, ref} from '../utils/componentHelpers';
import Dialog from './dialog';
import Loader from './loader';
import {tokenGet} from '../services/token';

export default class Form extends Component {
	constructor(props) {
		super(props);

		this.form = null;

		this.state = {
			errors: [],
			loading: false,
			dialog: '',
			inputs: this.getInitialState(props)
		};
	}

	static propTypes = {
		rows: ImmutablePropTypes.list,
		groups: ImmutablePropTypes.list,
		onSubmit: PropTypes.func,
		successMessage: PropTypes.string,
		errorMessage: PropTypes.string
	}

	static defaultProps = {
		rows: List(),
		groups: List(),
		onSubmit: noop,
		successMessage: 'Thank you for your email!',
		errorMessage: 'There was an issue submitting your message =('
	}

	getInitialState(props) {
		const userLocation = tokenGet('location');
		const initialState = {};

		if (!props.rows) {
			return initialState;
		}

		return props.rows.reduce((state, row) => {
			if (row.get('columns')) {
				row.get('columns').forEach(column => {
					let value = '';
					if (column.get('type') === 'checkbox') {
						value = [];
					}

					if (column.get('name') === 'location' && userLocation) {
						value = userLocation.title;
					}

					state[column.get('name')] = value;
				});
			}

			return state;
		}, initialState);
	}

	getInput(name) {
		const columns = this.props.rows.reduce((list, row) => {
			if (!row || row.get('columns').isEmpty()) {
				return list;
			}

			return list.concat(row.get('columns'));
		}, List());

		return columns.find(c => c.get('name') === name);
	}

	@bind()
	getGroups() {
		const {groups, rows} = this.props;

		if (groups.isEmpty()) {
			return this.getGroupsByFields();
		}

		return groups.map(group => {
			const groupRows = rows.filter(r => r.get('group') === group.get('id'));

			return fromJS({
				label: group.get('label'),
				id: group.get('id'),
				group: true,
				rows: groupRows.map((row, index) => {
					return fromJS({
						id: index,
						...row.toJS()
					});
				})
			});
		});
	}

	formErrors() {
		const data = fromJS(this.state.inputs);
		let errors = [];

		data.forEach((value, key) => {
			const input = this.getInput(key);

			if (input.get('required') && !this.inputValid(input, value)) {
				errors.push({
					input: input.get('name'),
					message: this.getErrorMessage(input)
				});
			}
		});

		return errors;
	}

	scrollToFirstError(inputName) {
		const elem = this.form.querySelector(`[name="${inputName}"]`);

		if (elem) {
			// eslint-disable-next-line no-new
			new ScrollTo(elem, {
				container: window,
				duration: 300
			});

			elem.focus();
		}
	}

	@bind()
	getErrorMessage(input) {
		return input.get('error') && input.get('error') !== '' ? input.get('error') : `${input.get('name')} is required.`;
	}

	@bind()
	getError(input) {
		const err = this.state.errors.find(error => error.input === input.get('name'));

		if (!err) {
			return;
		}

		return this.getErrorMessage(input);
	}

	inputValid(input, value) {
		if (input.get('type') === 'checkbox' && value && value.count) {
			return Boolean(value.count());
		}

		if (input.get('type') === 'email') {
			return this.emailValid(value);
		}

		return value !== '';
	}

	emailValid(value) {
		const regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
		return regex.test(String(value).toLowerCase());
	}

	@bind()
	isChecked(name, option) {
		const param = this.state.inputs[name];

		if (!param) {
			return false;
		}

		return param.includes(option.get('value'));
	}

	@bind()
	handleCheckboxChange(name) {
		return value => {
			this.setState(prevState => {
				const newState = prevState;
				let param = prevState.inputs[name] ? prevState.inputs[name] : [];

				if (param.includes(value)) {
					param = param.filter(i => i !== value);
				} else {
					param.push(value);
				}

				newState.inputs[name] = param;

				return newState;
			});
		};
	}

	@bind()
	handleRadioChange(name) {
		return value => {
			this.setState(prevState => {
				const newState = {...prevState};
				newState.inputs[name] = value;

				return newState;
			});
		};
	}

	@bind()
	handleTextChange(state) {
		this.setState(prevState => {
			const newState = {...prevState};
			newState.inputs = {
				...newState.inputs,
				...state
			};

			return newState;
		});
	}

	@bind()
	async handleSubmit(inputs) {
		const errors = this.formErrors();

		if (errors.length) {
			this.scrollToFirstError(errors[0].input);

			return this.setState({
				errors: this.formErrors()
			});
		}

		this.setState({loading: true});
		await this.props.onSubmit(inputs);
		return this.setState({loading: false, dialog: this.props.successMessage});
	}

	@bind()
	handleClose() {
		this.setState({
			dialog: ''
		});
	}

	render() {
		const {loading} = this.state;

		return (
			<Fragment>
				<form
					key="form__form"
					ref={ref.call(this, 'form')}
					onSubmit={clickPrevent(this.handleSubmit, this.state.inputs)}
				>
					{this.props.groups && this.props.groups.isEmpty() ? this.renderFormByFields() : this.renderFormByGroups()}
					<div className="row">
						<div className="span-12">
							{loading ?
								<a className="btn btn-primary" style={{padding: 0}}>
									<Loader
										viewHeight={48}
										viewWidth={77.5}
										margin="0 38.75px"
										width={155}
										height={48}
									/>
								</a> : <input type="submit" value="Send"/>
							}
						</div>
					</div>
				</form>
				<Dialog
					key="form__dialog"
					fogDismiss
					showDismiss={false}
					showCancel={false}
					id="form-dialog"
					active={this.state.dialog && this.state.dialog !== '' ? [true] : []}
					size="auto"
					confirmText="Close"
					onClose={this.handleClose}
					onDismiss={this.handleClose}
				>
					<p>{this.state.dialog}</p>
				</Dialog>
			</Fragment>
		);
	}

	@bind()
	renderFormByGroups() {
		const groups = this.getGroups();

		return groups.map(group => {
			return (
				<div key={group.get('id')} className="form-group">
					<label>{group.get('label')}</label>
					{group.get('rows').map(this.renderRow)}
				</div>
			);
		});
	}

	@bind()
	renderFormByFields() {
		const {rows} = this.props;

		return rows.map(this.renderRow);
	}

	@bind()
	renderRow(row) {
		return (
			<div key={row.get('id')} className="row">
				{row.get('columns').map(column => {
					return (
						<div key={column.get('name')} className={column.get('class')}>
							{this.renderInput(column)}
						</div>
					);
				})}
			</div>
		);
	}

	@bind()
	renderInput(input) {
		const type = input.get('type');

		if (type === 'text' || type === 'email') {
			return this.renderTextInput(input);
		}

		if (type === 'checkbox' || type === 'radio') {
			return this.renderCheckboxInput(input);
		}

		if (type === 'textarea') {
			return this.renderTextarea(input);
		}

		return null;
	}

	@bind()
	renderTextInput(input) {
		const error = this.getError(input);

		const errorClasses = ['form-input__error'];

		if (error) {
			errorClasses.push('active');
		}

		return (
			<div className="form-input">
				<input
					autoComplete={input.get('name')}
					type={input.get('type')}
					name={input.get('name')}
					value={this.state.inputs[input.get('name')]}
					required={input.get('required')}
					placeholder={input.get('placeholder')}
					onKeyUp={enter(this.handleSubmit)}
					onChange={state(this.handleTextChange, input.get('name'))}
				/>
				<small className={errorClasses.join(' ')}>{error}</small>
			</div>
		);
	}

	@bind()
	renderTextarea(input) {
		const error = this.getError(input);

		const errorClasses = ['form-input__error'];

		if (error) {
			errorClasses.push('active');
		}

		return (
			<div className="form-input">
				<textarea
					name={input.get('name')}
					value={this.state.inputs[input.get('name')]}
					required={input.get('required')}
					placeholder={input.get('placeholder')}
					onKeyUp={enter(this.handleSubmit)}
					onChange={state(this.handleTextChange, input.get('name'))}
				/>
				<small className={errorClasses.join(' ')}>{error}</small>
			</div>
		);
	}

	@bind()
	renderCheckboxInput(input) {
		const type = input.get('type');
		const isCheckbox = type === 'checkbox';
		const callback = isCheckbox ? this.handleCheckboxChange(input.get('name')) : this.handleRadioChange(input.get('name'));

		return (
			<div className="row">
				{input.get('options').map(option => {
					const checked = this.isChecked(input.get('name'), option) || false;
					const classes = [input.get('type')];

					if (checked) {
						classes.push('checked');
					}

					return (
						<div key={option.get('value')} className="span-12 span-4@tablet">
							<span className={classes.join(' ')} onClick={click(callback, option.get('value'))}>
								<span className="box"/>
								<input
									data-skip
									type={input.get('type')}
									name={input.get('name')}
									value={option.get('value')}
									onChange={click(callback, option.get('value'))}
									checked={checked}
								/>
								<label>{option.get('value')}</label>
							</span>
						</div>
					);
				})}
			</div>
		);
	}
}

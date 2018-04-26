import '../images/logo.svg';

import moduleRegistry from './modules';
import Checkbox from './react/checkbox';
import RadioGroup from './react/radio';
import Select from './react/select';
import LoginForm from './modules/loginform';

moduleRegistry.init();

window.initModules = function () {
	moduleRegistry.init();
	initElements();
};

window.initElements = function () {
	initElements();
};

document.addEventListener('DOMContentLoaded', () => {
	initElements();
});

function initElements() {
	const selects = document.querySelectorAll('select:not([data-skip])');
	const checkboxes = document.querySelectorAll('input[type="checkbox"]:not([data-skip])');
	const radios = document.querySelectorAll('input[type="radio"]:not([data-skip])');
	const loginForms = document.querySelectorAll('#loginform');

	selects.forEach(el => {
		new Select(el); //eslint-disable-line
	});

	checkboxes.forEach(el => {
		new Checkbox(el); //eslint-disable-line
	});

	radios.forEach(el => {
		new RadioGroup(el); //eslint-disable-line
	});

	loginForms.forEach(el => {
		new LoginForm(el); // eslint-disable-line no-new
	});
}

import 'babel-polyfill';
import $ from 'jquery';

import '../images/logo.svg';

import moduleRegistry from './modules';
import Checkbox from './libs/checkboxes';
import RadioGroup from './libs/radio';
import Select from './libs/selects';
import LoginForm from './libs/loginform';

moduleRegistry.init();

window.initModules = function () {
	moduleRegistry.init();
	initElements();
};

window.initElements = function () {
	initElements();
};

$(document).ready(() => {
	initElements();
});

function initElements() {
	$('select').each((index, el) => {
		new Select(el); //eslint-disable-line
	});

	$('input[type="checkbox"]').each((index, el) => {
		new Checkbox(el); //eslint-disable-line
	});

	let groups = [];
	$('input[type="radio"]:not([data-skip])').each((index, el) => {
		const name = $(el).attr('name');
		let group = groups.find(group => group.name === name);

		if (!group) {
			group = {
				name,
				inputs: []
			};

			groups.push(group);
		}

		group.inputs.push(el);
	});

	groups.forEach(group => new RadioGroup(group)); //eslint-disable-line

	$('#loginform').each((index, el) => {
		new LoginForm(el); // eslint-disable-line no-new
	});
}

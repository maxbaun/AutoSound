export default class LoginForm {
	constructor(el) {
		this.el = el;

		this.setupPlaceholders();
	}

	setupPlaceholders() {
		const username = this.el.querySelector('.login-username');
		const password = this.el.querySelector('.login-password');

		const userLabel = username.querySelector('label');
		const passwordLabel = password.querySelector('label');

		const userInput = username.querySelector('input');
		const passwordInput = password.querySelector('input');

		if (userInput) {
			userInput.setAttribute('placeholder', userLabel ? userLabel.innerHTML : 'Username');
		}

		if (passwordInput) {
			passwordInput.setAttribute('placeholder', passwordLabel ? passwordLabel.innerHTML : 'Password');
		}
	}
}

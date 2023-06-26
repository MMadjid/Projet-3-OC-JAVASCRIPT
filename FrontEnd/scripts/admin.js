// Getting all elements affected by admin view
const editBanner = document.querySelector('#edit-banner');
const loginLink = document.querySelector('#login-link');
const editButtons = document.querySelectorAll('.edit');
const filters = document.querySelector('.filters');

// Change admin elements if login token is in session storage
if (window.sessionStorage.getItem('token')) {
	// Display edit banner
	editBanner.style.display = 'flex';
	editBanner.removeAttribute('aria-hidden');

	// Change login to logout
	loginLink.href = 'index.html';
	loginLink.innerText = 'logout';

	// Logout removes token from session storage
	loginLink.addEventListener('click', () => {
		window.sessionStorage.removeItem('token');
	});

	// Hide filters
	filters.style.display = 'none';
	filters.setAttribute('aria-hidden', true);

	// Display edit buttons
	for (let button of editButtons) {
		button.style.display = 'flex';
		button.removeAttribute('aria-hidden');
	}
}

// Show alert box after login
if (window.sessionStorage.getItem('showAlertBox')) {
	displayAlertBox('success', 'Connexion réussie', 3000);
	window.sessionStorage.removeItem('showAlertBox');
}

// Create an alert box
function alertBox(type, message) {
	const box = document.createElement('div');
	box.className = 'alert-box';

	switch (type) {
		case 'success':
			box.style.backgroundColor = '#5cb54e';
			break;
		case 'error':
			box.style.backgroundColor = '#e84a3f';
			break;
	}

	const text = document.createElement('p');
	text.innerText = message;
	box.appendChild(text);

	const closeButton = document.createElement('button');
	closeButton.addEventListener('click', () => box.parentNode.removeChild(box));
	const closeIcon = document.createElement('i');
	closeIcon.className = 'fa-solid fa-xmark';
	closeButton.appendChild(closeIcon);
	box.appendChild(closeButton);

	return box;
}

// Display alert box
export function displayAlertBox(type, message, duration) {
	// Return if there is already an alert-box on the screen
	if (document.querySelector('.alert-box')) return;

	const alert = alertBox(type, message);
	document.querySelector('main').appendChild(alert);

	if (duration) {
		window.setTimeout(() => {
			if (document.querySelector('main').lastChild.className !== 'alert-box') return;
			alert.parentNode.removeChild(alert);
		}, duration);
	}
}

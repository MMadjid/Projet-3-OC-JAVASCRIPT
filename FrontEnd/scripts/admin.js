// Constantes utilisées
const Banniere = document.querySelector('#edit-banner');
const lienLogin = document.querySelector('#login-link');
const boutonModifier = document.querySelectorAll('.edit');
const filtres = document.querySelector('.filters');

// Passer par le Token et les éléments qu'il contient pour modifier les éléments "admin"
if (window.sessionStorage.getItem('token')) {
	// Bannière d'édition
	Banniere.style.display = 'flex';
	Banniere.removeAttribute('aria-hidden');

	// Passe du "login" au "logout"
	lienLogin.href = 'index.html';
	lienLogin.innerText = 'logout';

	// Logout removes token from session storage ( la déco enlève les éléments du jeton "token",
	// ils empêchent d'acceder à tout les éléments d'un profil connecté)
	lienLogin.addEventListener('click', () => {
		window.sessionStorage.removeItem('token');
	});

	// Hide Filters (cache les filtres)
	filtres.style.display = 'none';
	filtres.setAttribute('aria-hidden', true);

	// Display edit buttons (affiche les bouttons d'édition)
	for (let button of boutonModifier) {
		button.style.display = 'flex';
		button.removeAttribute('aria-hidden');
	}
}

// Show alert box after login (envoi un message quand quelqu'un se login)
if (window.sessionStorage.getItem('showAlertBox')) {
	displayAlertBox('success', 'Connexion réussie', 3000);
	window.sessionStorage.removeItem('showAlertBox');
}

// Creation fenetre d'alerte (alert box)
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

// Afficher la boite d'alerte
export function displayAlertBox(type, message, duration) {
	// Return if there is already an alert-box on the screen
	if (document.querySelector('.alert-box')) return;

	const alerte = alertBox(type, message);
	document.querySelector('main').appendChild(alerte);

	if (duration) {
		window.setTimeout(() => {
			if (document.querySelector('main').lastChild.className !== 'alert-box') return;
			alerte.parentNode.removeChild(alerte);
		}, duration);
	}
}

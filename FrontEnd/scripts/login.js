import { displayAlertBox } from './admin.js';

	// Fonction qui gère la connection
	async function loginSubmit(event) {
	// Empêcher l'événement de formulaire par défaut lors du lancement
	event.preventDefault();

	// Transformer les données du formulaire
	const data = new FormData(event.target);
	const user = {
		email: data.get('email'),
		password: data.get('password'),
	};

	// Lien entre utilisateur et l'api pour vérifier la compatibilité des e-mails et des mots de passe
	const responseLogin = await fetch('http://localhost:5678/api/users/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	});
	const userLogin = await responseLogin.json();

	// Si mail et MDP sont correct, alors direction page principale (grace au token), sinon direction message d'alerte
	if (responseLogin.status === 200) {
		// boolean utilisé pour l'alerte sur l'index après une connexion réussie
		window.sessionStorage.setItem('showAlertBox', true);

		window.sessionStorage.setItem('token', userLogin.token);
		window.location.href = 'index.html';
	} else {
		displayAlertBox('error', "Erreur dans l'identifiant ou le mot de passe", 3000);
	}
}

// Ajout de la fonction de connexion au formulaire de soumission
const loginDeFormulaire = document.querySelector('#login');
loginDeFormulaire.addEventListener('submit', loginSubmit);

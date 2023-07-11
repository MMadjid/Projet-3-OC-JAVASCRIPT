// Fetching all works from API (permet de récuperer les infos via le lien API. dans ce cas précis c'est "work")
const responseWorks = await fetch('http://localhost:5678/api/works');
const works = await responseWorks.json();

// Fetching all categories from API (pareil mais pour l'onglet "catégorie")
const responseCategories = await fetch('http://localhost:5678/api/categories');
const categories = new Set(await responseCategories.json());

// Function that creates gallery using an array of works (creation de la galerie via le tableau works)
export function createGallery(works) {
	const gallery = document.querySelector('.gallery');

	for (let work of works) {
		const figure = document.createElement('figure');
		gallery.appendChild(figure);

		const img = document.createElement('img');
		img.src = work.imageUrl;
		img.alt = work.title;

		const figcaption = document.createElement('figcaption');
		figcaption.innerText = work.title;

		figure.appendChild(img);
		figure.appendChild(figcaption);
	}
}

createGallery(works);

// Fonction qui crée des filtres via le tableau catégorie
function createFilters(categories) {
	const filters = document.querySelector('.filters');

	// Création bouton no-filter 
	const buttonNoFilter = document.createElement('button');
	buttonNoFilter.innerText = 'Tous';
	buttonNoFilter.className = 'active';
	filters.appendChild(buttonNoFilter);
	// Ajout "click event listener"
	buttonNoFilter.addEventListener('click', () => {
		document.querySelector('.active').className = '';
		buttonNoFilter.className = 'active';

		document.querySelector('.gallery').innerHTML = '';
		createGallery(works);
	});

	// Creation bouton filtre
	for (let category of categories) {
		const button = document.createElement('button');
		button.innerText = category.name;

		// Ajout "click event listener"
		button.addEventListener('click', () => {
			document.querySelector('.active').className = '';
			button.className = 'active';

			// Le Filtre fonctionne en utilisant l'identifiant catégorie
			const worksFiltered = works.filter((work) => work.category.id === category.id);

			// Effacer la galerie puis la recréer en fonction des filtres
			document.querySelector('.gallery').innerHTML = '';
			createGallery(worksFiltered);
		});

		filters.appendChild(button);
	}
}

createFilters(categories);

let pokemonRepository = (function () {
let modalContainer = document.querySelector("#modal-container");
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

function getAll() {
return pokemonList;
}

function add(pokemon) {
pokemonList.push(pokemon);
}

function addListItem (pokemon){
let pokemonFile = document.querySelector('.pokemon-list');
let listItem = document.createElement('li');
let button = document.createElement('button');
button.innerText = pokemon.name;
button.classList.add("button-class");
listItem.appendChild(button);
pokemonFile.appendChild(listItem);
button.addEventListener('click', function (event) {
ShowDetails(pokemon);
});
}

function loadList () {
return fetch(apiUrl).then(function(response) {
return response.json();
}).then(function (json) {
json.results.forEach(function (item) {
let pokemon = {
name: item.name,
detailsUrl: item.url
};
add(pokemon);
});
}).catch(function (e) {
console.error(e);
})
}

function loadDetails(item) {
let url = item.detailsUrl;
return fetch(url).then(function (response) {
return response.json();
}).then(function (details) {
// Now we add the details to the item
item.imageUrl = details.sprites.front_default;
item.height = details.height;
item.types = details.types;
}).catch(function (e) {
console.error(e);
})
}

function showModal(pokemon) {
// Clear all existing modal content
modalContainer.innerHTML = '';
let modal = document.createElement('div');
modal.classList.add('modal');
// Add the new modal content
let closeButtonElement = document.createElement('button');
closeButtonElement.classList.add('modal-close');
closeButtonElement.innerText = 'Close';
closeButtonElement.addEventListener('click', hideModal);

let titleElement = document.createElement('h1');
titleElement.innerText = pokemon.name;

let contentElement = document.createElement('p');
contentElement.innerText = pokemon.height;


let container = document.querySelector('#modal-container');

// Create an <img> element
let myImage = document.createElement('img');

// setting `src` property to set the actual element's `src` attribute
// this also works on <img> elements selected by querySelector() method, it is not specific for <img> elements created with createElement() methods
myImage.src = pokemon.imageUrl;

modal.appendChild(myImage);

modal.appendChild(closeButtonElement);
modal.appendChild(titleElement);
modal.appendChild(contentElement);
modalContainer.appendChild(modal);

modalContainer.classList.add('is-visible');
}

function hideModal() {
let modalContainer = document.querySelector('#modal-container');
modalContainer.classList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {

if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
hideModal();
}
});

modalContainer.addEventListener('click', (e) => {
// Since this is also triggered when clicking INSIDE the modal
// We only want to close if the user clicks directly on the overlay
let target = e.target;
if (target === modalContainer) {
hideModal();
}
});

function ShowDetails(pokemon) {
pokemonRepository.loadDetails(pokemon).then(function(){
showModal(pokemon);
});
};

return{
add: add,
getAll: getAll,
addListItem: addListItem,
loadList: loadList,
loadDetails: loadDetails,
ShowDetails: ShowDetails
};

})();

pokemonRepository.loadList().then(function() {
pokemonRepository.getAll().forEach(function(pokemon) {
pokemonRepository.addListItem(pokemon);
});
});

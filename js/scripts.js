let pokemonRepository = (function () {
  let modalContainer = document.querySelector('#modal-container');
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  // Other functions remain here

function add(pokemon) {
  if (
    typeof pokemon === "object" &&
    "name" in pokemon //&&
  //"detailsUrl" in pokemon
) {
  pokemonList.push(pokemon);
} else {
  console.log ("pokemon is not correct");
  }
}

function getAll() {
  return pokemonList;
}

function LoadList () {
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

function LoadDetails(pokemon) {
  let url = pokemon.detailsUrl;
  return fetch(url)
  .then(function (response) {
  return response.json();
  })
  .then(function (details) {
    // Now we add the details to the item
    pokemon.imageUrl = details.sprites.front_defaults;
    pokemon.height = details.height;
    pokemon.types = details.types;
    }).catch(function (e) {
    console.error(e);
  });
}

function ShowDetails(pokemon) {
  pokemonRepository.LoadDetails(pokemon).then(function(){
  showModal(pokemon);
  });
  }

function addListItem (pokemon){
  let pokemonList = document.querySelector('.pokemon-list');
  let listpokemon = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add("button-class");
  button.setAttribute('data-target', '#pokemonModal', 'data-toggle', 'modal');
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);
  button.addEventListener("click", function(event) {
    ShowDetails(pokemon);
  });
}

function showModal(pokemon) {

  modalContainer.classList.add('is-visible');
}

document.querySelector('.pokemon-list').addEventListener('click', () => {
   showModal(pokemon);
});

function showModal(title, text) {


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

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);

  modalContainer.classList.add('is-visible');
}

function hideModal() {

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

  return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  LoadList: LoadList,
  LoadDetails: LoadDetails,
  ShowDetails: ShowDetails
  };
})();

  pokemonRepository.LoadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

let pokemonRepository = (function () {
let modalContainer = document.querySelector("#modal-container");
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
// Other functions remain here

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

 function loadDetails(pokemon) {
  let url = item.detailsUrl;
  return fetch(url).then(function (response) {
  return response.json();
  }).then(function (details) {
    // Now we add the details to the item
  item.imageUrl = details.sprites.front_defaults;
  item.height = details.height;
  item.types = details.types;
  }).catch(function (e) {
  console.error(e);
  })
}

function showModal(pokemon) {
  // Clear all existing modal content
  titleElement.innerText = pokemon.name;
  contentElement.innerText = pokemon.height;
  contentElement.innerText = pokemon.type;
  contentElement.innerText = pokemon.image;
  contentElement.innerText = pokemon.abilities;

  // Add the new modal content
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  let titleElement = document.createElement('h1');
  titleElement.innerText = title;

  let contentElement = document.createElement('p');
  contentElement.innerText = text;

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);

  modalContainer.classList.add('is-visible');
}

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');

    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
  }
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
      }
      modalTitle.empty();
      modalBody.empty();

      let pokemonName = $('<h1>' + pokemon.name + '</h1>');
      let pokemonImage = $('<img class="modal-img" style="width:50%">');
      pokemonImage.attr('src', pokemon.imageUrl);
      let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height + '</p>');
      let pokemonTypes = document.createElement('span');
      let types = 'Types: ';
      pokemon.types.forEach(function(item) {
        types += item.type.name + ' ';
      });
      pokemonTypes.innerHTML = types;

      modalTitle.append(pokemonName);
      modalBody.append(pokemonImage);
      modalBody.append(pokemonHeight);
      modalBody.append(pokemonTypes);

      $('#pokemonModal').modal('toggle');
    });
  }

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

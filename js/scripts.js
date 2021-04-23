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
    console.log(pokemon);
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
  item.imageUrl = details.sprites.front_defaults;
  item.height = details.height;
  item.types = details.types;
  }).catch(function (e) {
  console.error(e);
  })
}

document.querySelector('#show-modal').addEventListener('click', () => {
  showModal();
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
  titleElement.innerText = title;

  let contentElement = document.createElement('p');
  contentElement.innerText = text;

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);

  modalContainer.classList.add('is-visible');
}
function showDialog(title, text) {
  showModal(title, text);

  // We have defined modalContainer here
  let modalContainer = document.querySelector('#modal-container');

  // We want to add a confirm and cancel button to the modal
  let modal = modalContainer.querySelector('.modal');

  let confirmButton = document.createElement('button');
  confirmButton.classList.add('modal-confirm');
  confirmButton.innerText = 'Confirm';

  let cancelButton = document.createElement('button');
  cancelButton.classList.add('modal-cancel');
  cancelButton.innerText = 'Cancel';

  modal.appendChild(confirmButton);
  modal.appendChild(cancelButton);

  // We want to focus the confirmButton so that the user can simply press Enter
  confirmButton.focus();
  return new Promise((resolve, reject) => {
  cancelButton.addEventListener('click', hideModal);
  confirmButton.addEventListener('click', () => {
    dialogPromiseReject = null; // Reset this
    hideModal();
    resolve();
  });
  // This can be used to reject from other functions
  dialogPromiseReject = reject;
});
}

function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');

  if (dialogPromiseReject) {
    dialogPromiseReject();
    dialogPromiseReject = null;
  }
}

document.querySelector('#show-dialog').addEventListener('click', () => {
  showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
    alert('confirmed!');
  }, () => {
    alert('not confirmed');
  });
});

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

  document.querySelector('#show-modal').addEventListener('click', () => {
  showModal('Modal title', 'This is the modal content!');
});


  function ShowDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');

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
       loadList: LoadList,
       loadDetails: LoadDetails,
       ShowDetails: ShowDetails


   };


})();

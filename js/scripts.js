let pokemonRepository = (function () {
let modalContainer = $("#modal-container");
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

function getAll() {
  return pokemonList;
}

function add(pokemon) {
  pokemonList.push(pokemon);
}

function addListItem (pokemon){
  let listPokemon = $('pokemon-list')[0]
  listPokemon.parent();
  const name = (pokemon.name);
  let listItem = $('<li class="pokemon-list-item" class="pokemon-list-item-action" >name[0].toUpperCase();</li>');
  let button = $('<div class="button" class="btn" class="btn-dark" class="btn-block" class="mb-2">name[0].toUpperCase();</div>');
   $('button').attr("data-target","#pokemonModal","data-toggle","modal")
   $('listPokemon').append(listItem);
   $('listItem').append(button);
    //add event listener to our items button that show details
   button.on("click", function(event){
   showDetails(pokemon);
  });
}

function loadList () {
  $.ajax('apiUrl', { dataType: 'json'}).then(function(response) {
  console.log(responseJSON);
  })
  }).then(function(json) {
  json.results.forEach(function(item) {
    let pokemon = {
    name: item.name,
    detailsUrl: item.url
};
    add(pokemon);
  });
  }).catch(function(err){
    console.log('Caught an error:' + err.statusText);
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
}).catch(function(err){
  console.log('Caught an error:' + err.statusText);
}
})
// show the details of pokemon
function showDetails(pokemon) {
  pokemonRepository.loadDetails(pokemon).then(function() {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

 // Create eLement for name within the modal content.
    let nameElement = $('<h1>' + pokemon.name + '</h1>');
    modalTitle.appendChild(nameElement);

  // Create eLement for image within the modal content.
    let imageElementFront = $("<img class='modal-img' style = 'width:50%'>");
    imageElementFront.attr("src", pokemon.imageUrl);
    modalBody.appendChild(imageElementFront);

  // Create element for weight within modal content.
    let heightElement = $("<p>"+"height : " + pokemon.height + "</p>");
    modalBody.appendChild(heightElement);

  // Create element for type within the modal content.
    let typesElement = $("</p>" + "types : " + pokemon.types + "</p>");


    modalBody.appendChild(typesElement);

    modalContainer.appendChild(modal);

     $('#pokemonModal').modal('toggle');
    });
}


return{
add: add,
getAll: getAll,
addListItem: addListItem,
loadList: loadList,
loadDetails: loadDetails,
showDetails: showDetails
};

})();

pokemonRepository.loadList().then(function() {
pokemonRepository.getAll().forEach(function(pokemon) {
pokemonRepository.addListItem(pokemon);
});
});

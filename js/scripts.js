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
  let listPokemon = document.getElementsByClassName('pokemon-list')[0]
  const name = (pokemon.name);


        let listItem = document.createElement("li");
        listItem.classList.add("pokemon-list-item");
        listItem.classList.add("pokemon-list-item-action");
         let button = document.createElement("button");
          button.innerText= name[0].toUpperCase();
          button.classList.add("btn");
          button.classList.add("btn-dark");
          button.classList.add("btn-block")
          button.classList.add("mb-2")
        button.setAttribute("data-target","#pokemonModal")
        button.setAttribute("data-toggle","modal")
         listPokemon.appendChild(listItem);
         listItem.appendChild(button);

          //add event listener to our items button that show details
         button.addEventListener("click",function(event){
             showDetails(pokemon)
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
  Let heightElement = $("<p>"+"height : " + pokemon.height + "</p>");
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

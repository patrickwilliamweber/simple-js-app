var pokemonRepository = (function () {
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
    console.log(pokemon);
  });
  }).catch(function (e) {
    console.error(e);
  })
}

 function LoadDetails(item) {
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

  function ShowDetails(pokemon) {
    LoadDetails(pokemon).then(function () {
    console.log(pokemon);
  });

}

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  LoadList: LoadList,
  ShowDetails: ShowDetails
 };
})();

pokemonRepository.LoadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

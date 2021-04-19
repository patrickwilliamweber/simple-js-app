var pokemonRepository = (function () {
  var pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

 // Other functions remain here

 function loadList() {
   return fetch(apiUrl).then(function (response) {
     return response.json();
   }).then(function (json) {
     json.results.forEach(function (item) {
       let pokemon = {
         height: item.height,
         imageUrl: item.url
       };
       add(pokemon);
     });
   }).catch(function (e) {
     console.error(e);
   })
 }

 return {
   add: add,
   getAll: getAll,
   loadList: loadList 
 };
})();

pokemonRepository.loadList().then(function() {
 // Now the data is loaded!
 pokemonRepository.getAll().forEach(function(pokemon){
   pokemonRepository.addListItem(pokemon);
 });
});
  }











  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  function addListItem (pokemon){
    let pokemon-File = document.querySelector('.pokemon-File');
    let button = document.createElement('button');
    button.addEventListener('click', function (event) {
      event.ShowDetails();
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    pokemonList.appendChild(listpokemon);
  }

function ShowDetails {

  console.log();
}

    return {
     add: add,
     getAll: getAll
     addListItem: addListItem
     ShowDetails : ShowDetails
   };
})();

console.log(pokemonRepository.getAll() );

  pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});

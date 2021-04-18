var pokemonRepository = (function () {
  var pokemonList = [
    {
      name: 'Charizard',
      height: 1.7,
      types: 'fire,flying'
    },
    {
      name: 'Squirtle',
      height: 0.5,
      types: 'water'
    },
    {
      name: 'Pikachu',
      height: 0.4,
      types: 'electric'
    }
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  function addListItem (pokemon){
    let pokemon-list = document.querySelector('.pokemon-list');
    let button = document.createElement('button');
    button.innerText = "pokemon.name";
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
  }
  function ShowDetails(pokemon) {
    console.log()
    
  }
   return {
     add: add,
     getAll: getAll
     addListItem: addListItem
   };
})();

console.log(pokemonRepository.getAll() );

  pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});

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

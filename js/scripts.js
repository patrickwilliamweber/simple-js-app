var pokemonRepository = (function () {
let pokemonList = [
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
button.addEventListener('click', function () {
ShowDetails(pokemon);
})
}

function ShowDetails(pokemon) {
console.log(pokemon);
}

return {
add: add,
getAll: getAll,
addListItem: addListItem,
ShowDetails : ShowDetails
};
})();

pokemonRepository.getAll().forEach(function (pokemon) {
pokemonRepository.addListItem(pokemon);
});

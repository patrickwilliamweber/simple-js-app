let pokemonRespiratory = (function () {
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
types: 'electric'},
];

function getAll(){
  return pokemonList;
}

function add(pokemon) {
  pokemonList.push(pokemon);
}

return {
  getAll: getAll.
  add: add

};
}}();

console.log( pokemonrespiiratory.getAll() );

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

pokemonList.forEach(function(pokemon) {
  console.log(pokemon.name);
});

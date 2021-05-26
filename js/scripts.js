let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function addListItem(pokemon) {
    let listPokemon = $('.pokemon-list-item');
    let listItem = $('<li></li>');
    const listItemCapitalized = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    

    let button = $(
      '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#pokemonModal"></button>'
    );
    button.attr({ 'data-target': '#pokemonModal', 'data-toggle': 'modal' });
    button.text(pokemon.name);
    listPokemon.append(listItem);
    button.text(listItemCapitalized);
    listItem.append(button);
     //add event listener to our items button that show details
    button.on('click', function () {
      showDetails(pokemon);
    });
  }

  function loadList() {
    /*return*/
    return $.ajax(apiUrl, { dataType: 'json' })
      .then(function (response) {
        return response;
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (err) {
        console.log('Caught an error:' + err.statusText);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return $.ajax(url, { dataType: 'json' })
      .then(function (response) {
        return response;
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (err) {
        console.log('Caught an error:' + err.statusText);
      });
  }
  // show the details of pokemon
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');
      modalTitle.empty();
      modalBody.empty();
      // Create eLement for name within the modal content.
      let nameElement = $('<h1>' + pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) + '</h1>');
      modalTitle.append(nameElement);
      // Create eLement for image within the modal content.
      let imageElementFront = $('<img class=\'modal-img\' style = \'width:50%\'>');
      imageElementFront.attr('src', pokemon.imageUrl);
      modalBody.append(imageElementFront);
      // Create element for weight within modal content.
      let heightElement = $('<p>' + 'height : ' + pokemon.height + '</p>');
      modalBody.append(heightElement);
      // Create element for type within the modal content.
      const pokemonTypes = [];
      for (let i = 0; i < pokemon.types.length; i++) {
        pokemonTypes.push(pokemon.types[i].type.name);
      }
      let typesElement = $('</p>' + 'types : ' + pokemonTypes + '</p>');
      console.log(pokemonTypes);

      modalBody.append(typesElement);

      $('#pokemonModal').modal('toggle');
    });
  }

  $('[data-toggle="modal"]').on('click', function () {
    let targetSelector = $(this).attr('data-target');
    $(targetSelector).modal('show'); // Bootstrap’s own function to make the modal appear
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

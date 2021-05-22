let pokemonRepository = (function () {
  let t = [],
    e = "https://pokeapi.co/api/v2/pokemon/";
  function o(e) {
    t.push(e);
  }
  function n(t) {
    let e = t.detailsUrl;
    return $.ajax(e, { dataType: "json" })
      .then(function (t) {
        return t;
      })
      .then(function (e) {
        (t.imageUrl = e.sprites.front_default),
          (t.height = e.height),
          (t.types = e.types);
      })
      .catch(function (t) {
        console.log("Caught an error:" + t.statusText);
      });
  }
  function a(t) {
    n(t).then(function () {
      let e = $(".modal-body"),
        o = $(".modal-title");
      o.empty(), e.empty();
      let n = $("<h1>" + t.name + "</h1>");
      o.append(n);
      let a = $("<img class='modal-img' style = 'width:50%'>");
      a.attr("src", t.imageUrl), e.append(a);
      let l = $("<p>height : " + t.height + "</p>");
      e.append(l);
      const i = [];
      for (let e = 0; e < t.types.length; e++) i.push(t.types[e].type.name);
      let p = $("</p>types : " + i + "</p>");
      console.log(i), e.append(p), $("#pokemonModal").modal("toggle");
    });
  }
  return (
    $('[data-toggle="modal"]').on("click", function () {
      let t = $(this).attr("data-target");
      $(t).modal("show");
    }),
    {
      add: o,
      getAll: function () {
        return t;
      },
      addListItem: function (t) {
        let e = $(".pokemon-list-item"),
          o = $("<li></li>"),
          n = $(
            '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#pokemonModal"></button>'
          );
        n.attr({ "data-target": "#pokemonModal", "data-toggle": "modal" }),
          n.text(t.name),
          e.append(o),
          o.append(n),
          n.on("click", function () {
            a(t);
          });
      },
      loadList: function () {
        return $.ajax(e, { dataType: "json" })
          .then(function (t) {
            return t;
          })
          .then(function (t) {
            t.results.forEach(function (t) {
              o({ name: t.name, detailsUrl: t.url });
            });
          })
          .catch(function (t) {
            console.log("Caught an error:" + t.statusText);
          });
      },
      loadDetails: n,
      showDetails: a,
    }
  );
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});

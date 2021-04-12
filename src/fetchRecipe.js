const fetch = require("node-fetch");

// When a specific game is asked fetch the data of that game only else fetch ALL games
exports.fetchData = (req, res, endpoint, renderView, pageTitle) => {
  return fetch(endpoint, {
    headers: {
      "x-rapidapi-key": "85d43d1b47msh7273a9c7d1d5c94p1b0a1cjsnbc483a52d1e3",
      "x-rapidapi-host": "free-nba.p.rapidapi.com",
      useQueryString: true,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) =>
      res.render(renderView, {
        title: pageTitle,
        data: json,
      })
    );
};

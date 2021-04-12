const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

const http = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(http);
const { fetchData } = require("./src/fetchRecipe.js");

// static files
app.use(express.static(path.resolve("public")));
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/chat", (req, res) => {
  res.render("chat.ejs");
});

app.get("/categorie", async (req, res) => {
  const renderView = "categorie.ejs";
  const pageTitle = "Categorie";
  const endpoint = "https://www.themealdb.com/api/json/v1/1/categories.php";
  fetchData(req, res, endpoint, renderView, pageTitle);
});

app.get("/categorie/:categorie", async (req, res) => {
  console.log(req.params.categorie);

  const renderView = "spicificCategorie.ejs";
  const pageTitle = req.params.categorie;
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${req.params.categorie}`;
  fetchData(req, res, endpoint, renderView, pageTitle);
});

app.get("/meal/:id", async (req, res) => {
  console.log(req.params.id);

  const renderView = "meal.ejs";
  const pageTitle = req.params.categorie;
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${req.params.id}`;
  fetchData(req, res, endpoint, renderView, pageTitle);
});

io.on("connection", (socket) => {
  console.log("connected", socket.id);

  socket.on("chatMessage", (data) => {
    io.emit("chatMessage", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});

// Start server
app.listen(port, () => console.log("Listening to port " + port));

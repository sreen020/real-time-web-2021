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

// home route will be redirected to /categorie
app.get("/", (req, res) => {
  res.redirect("/categorie");
});

app.get("/chat", (req, res) => {
  res.render("chat.ejs");
});

// Data will be fetched to show all categories
app.get("/categorie", async (req, res) => {
  const renderView = "categorie.ejs";
  const pageTitle = "Categorie";
  const endpoint = "https://www.themealdb.com/api/json/v1/1/categories.php";
  fetchData(req, res, endpoint, renderView, pageTitle);
});

app.get("/shoppingList", async (req, res) => {
  res.render("shoppingList.ejs");
});

// Data will be fetched for all meals inside a spicific categorie
app.get("/categorie/:categorie", async (req, res) => {
  const renderView = "spicificCategorie.ejs";
  const pageTitle = req.params.categorie;
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${req.params.categorie}`;
  fetchData(req, res, endpoint, renderView, pageTitle);
});

// Data will be fetched for spicific meal
app.get("/meal/:id", async (req, res) => {
  const renderView = "meal.ejs";
  const pageTitle = req.params.categorie;
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${req.params.id}`;
  fetchData(req, res, endpoint, renderView, pageTitle);
});

// When user connects to application this function will trigger
io.on("connection", (socket) => {
  console.log("connected", socket.id);

  socket.on("chatMessage", (data) => {
    io.emit("chatMessage", data);
  });

  // broadcast means that it will show for all connected users EXCEPT for the user that triggers it
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});

// Start server
http.listen(port, () => console.log("Listening to port " + port));

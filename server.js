const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(http);
const { fetchData } = require("./src/fetchRecipe.js");

// static files
app.use(express.static(path.resolve("public")));
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("chat.ejs");
});

app.get("/recipes", async (req, res) => {
  const data = await fetchData();
  res.render("recipes.ejs", { data: data });

  console.log(data);
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

http.listen(4000, () => {
  console.log("listening on port 4000");
});

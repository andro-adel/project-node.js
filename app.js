const express = require("express");
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/home");

  res.send("<h1>Index Page</h1>");
});

app.get("/home", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.get("/html", (req, res) => {
  res.sendFile("views/index.ejs", { root: __dirname });
});

app.get("/index", (req, res) => {
  res.render("index");
});

// 404
app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
